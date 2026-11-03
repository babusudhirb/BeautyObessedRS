// Finds where the podcast message can sit inside the hero without covering
// anything important. Coordinates are relative to the hero stage.

const GAP = 12; // space between the podcast image and the message
const MARGIN = 6; // clearance from the hero's edges and from protected content
const STEP = 6; // search resolution, in pixels

// Content the message must never sit on top of: the heading, copy and main
// buttons, the salon label and the e-book title and button.
const PROTECTED = ['.hero-title__content', '.hero-salon__label', '.hero-ebook__text'];

// Rachna's face is in the right-hand part of the portrait panel in both the
// collage and the compact layout. Fractions of that panel's box.
const FACE = { selector: '.hero-panel--portrait', left: 0.4, top: 0, right: 1, bottom: 0.76 };

const relativeTo = (origin, rect) => ({
  left: rect.left - origin.left,
  top: rect.top - origin.top,
  right: rect.right - origin.left,
  bottom: rect.bottom - origin.top,
});

const grow = (rect, by) => ({
  left: rect.left - by,
  top: rect.top - by,
  right: rect.right + by,
  bottom: rect.bottom + by,
});

const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

// Returns { left, top } for the message. The preferred spot is centred above
// the image; if that would cover protected content or leave the hero, the
// nearest free spot above or beside the image is used instead.
export function findPopoverPosition(stage, trigger, popover) {
  const origin = stage.getBoundingClientRect();
  const anchor = relativeTo(origin, trigger.getBoundingClientRect());
  const width = popover.offsetWidth;
  const height = popover.offsetHeight;

  const blocked = PROTECTED.map((selector) => stage.querySelector(selector))
    .filter(Boolean)
    .map((element) => grow(relativeTo(origin, element.getBoundingClientRect()), MARGIN));

  const portrait = stage.querySelector(FACE.selector);
  if (portrait) {
    const box = relativeTo(origin, portrait.getBoundingClientRect());
    const boxWidth = box.right - box.left;
    const boxHeight = box.bottom - box.top;
    blocked.push({
      left: box.left + boxWidth * FACE.left,
      top: box.top + boxHeight * FACE.top,
      right: box.left + boxWidth * FACE.right,
      bottom: box.top + boxHeight * FACE.bottom,
    });
  }

  // The image itself stays uncovered, with a gap around it.
  blocked.push(grow(anchor, GAP - 1));

  const ideal = {
    left: (anchor.left + anchor.right - width) / 2,
    top: anchor.top - GAP - height,
  };
  const maxLeft = origin.width - MARGIN - width;
  const maxTop = origin.height - MARGIN - height;

  // Search outwards from the ideal spot: up to the full width of the message
  // to either side, and from well above the image down to level with it. Both
  // ranges start on a multiple of STEP so the ideal spot itself is tested.
  const reachX = Math.ceil((width + GAP) / STEP) * STEP;
  const reachUp = Math.ceil((height + 60) / STEP) * STEP;
  let best = null;
  let bestDistance = Infinity;

  for (let dy = -reachUp; dy <= anchor.bottom - anchor.top + GAP; dy += STEP) {
    const top = ideal.top + dy;
    if (top < MARGIN || top > maxTop) continue;

    for (let dx = -reachX; dx <= reachX; dx += STEP) {
      const left = ideal.left + dx;
      if (left < MARGIN || left > maxLeft) continue;

      const distance = dx * dx + dy * dy;
      if (distance >= bestDistance) continue;

      const rect = { left, top, right: left + width, bottom: top + height };
      if (blocked.some((area) => overlaps(rect, area))) continue;

      best = { left, top };
      bestDistance = distance;
    }
  }

  // Nothing free (an extremely small hero): keep the message above the image, inside the stage.
  const spot = best ?? {
    left: Math.min(Math.max(ideal.left, MARGIN), Math.max(MARGIN, maxLeft)),
    top: Math.min(Math.max(ideal.top, MARGIN), Math.max(MARGIN, maxTop)),
  };

  return { left: Math.round(spot.left), top: Math.round(spot.top) };
}
