import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Mic, X } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { findPopoverPosition } from './popoverPlacement.js';

const MESSAGE = "Hello! Let's do a live podcast. Talk about your routine.";

// Long enough to move the pointer from the image into the message.
const CLOSE_DELAY = 240;

// The podcast photograph inside the salon panel, with a small greeting that
// appears on hover, keyboard focus or (on touch screens) the first tap.
//
// The image stays a link to the podcast section. The greeting is rendered
// into the hero stage rather than next to the image, because the salon panel
// is clipped to its outline and would cut the greeting off.
export default function HeroPodcastInset() {
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const closeTimer = useRef(0);
  const input = useRef({ type: 'mouse', openBeforePress: false });

  const [stage, setStage] = useState(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const messageId = useId();

  useEffect(() => {
    setStage(triggerRef.current?.closest('.hero__stage') ?? null);
    return () => clearTimeout(closeTimer.current);
  }, []);

  const show = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(false);
  }, []);

  const hideSoon = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, []);

  // Choose the spot once per opening, before the message is painted, so it
  // never jumps or follows the pointer.
  useLayoutEffect(() => {
    if (open && stage) {
      setPosition(findPopoverPosition(stage, triggerRef.current, popoverRef.current));
    }
  }, [open, stage]);

  // While open: Escape, a press anywhere else, or a resize dismisses it.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => event.key === 'Escape' && hide();
    const onPointerDown = (event) => {
      const inside = triggerRef.current?.contains(event.target) || popoverRef.current?.contains(event.target);
      if (!inside) hide();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', hide);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', hide);
    };
  }, [open, hide]);

  const onTriggerClick = (event) => {
    // Touch screens have no hover: the first tap shows the greeting and the
    // next one follows the link. Mouse and keyboard follow it straight away.
    const { type, openBeforePress } = input.current;
    if (type !== 'mouse' && type !== 'keyboard' && !openBeforePress) {
      event.preventDefault();
      show();
    } else {
      hide();
    }
  };

  const leftFor = (event, other) => !other.current?.contains(event.relatedTarget);
  const visible = open && position !== null;

  return (
    <>
      <SmartLink
        ref={triggerRef}
        to="/#podcast"
        className="hero-salon__podcast"
        aria-describedby={messageId}
        onPointerEnter={(event) => event.pointerType === 'mouse' && show()}
        onPointerLeave={(event) => event.pointerType === 'mouse' && hideSoon()}
        onPointerDown={(event) => {
          input.current = { type: event.pointerType, openBeforePress: open };
        }}
        onKeyDown={() => {
          input.current.type = 'keyboard';
        }}
        onFocus={show}
        onBlur={(event) => leftFor(event, popoverRef) && hideSoon()}
        onClick={onTriggerClick}
      >
        <Picture
          name="podcast-rachna"
          alt="Rachna recording the Beauty Obsessed podcast with headphones and a studio microphone"
          sizes="(min-width: 966px) 17vw, 32vw"
          loading="eager"
        />
        <span className="hero-salon__tag">
          <Mic size={13} strokeWidth={2.2} aria-hidden="true" />
          Podcast
        </span>
      </SmartLink>

      {stage &&
        createPortal(
          <div
            ref={popoverRef}
            className="hero-hint"
            data-open={visible || undefined}
            style={position ?? undefined}
            onPointerEnter={(event) => event.pointerType === 'mouse' && show()}
            onPointerLeave={(event) => event.pointerType === 'mouse' && hideSoon()}
            onFocus={show}
            onBlur={(event) => leftFor(event, triggerRef) && hideSoon()}
          >
            <span className="hero-hint__icon" aria-hidden="true">
              <Mic size={15} strokeWidth={2} />
            </span>
            <p className="hero-hint__text" id={messageId}>
              {MESSAGE}
            </p>
            <button type="button" className="hero-hint__close" aria-label="Close message" onClick={hide}>
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>,
          stage,
        )}
    </>
  );
}
