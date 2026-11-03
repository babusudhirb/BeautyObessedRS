import { useId, useState } from 'react';
import Button from '../ui/Button.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { BRAND_ICONS } from '../ui/icons.jsx';
import useEmailSignup from '../../hooks/useEmailSignup.js';
import { guestRequestEndpoint, newsletterEndpoint } from '../../data/site.js';
import { guestForm, notify, youtubeChannel } from '../../data/podcastPage.js';

const YoutubeIcon = BRAND_ICONS.youtube;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', reason: '', message: '', link: '', consent: false };

const REQUEST_MESSAGES = {
  unavailable: 'Requests are not being collected yet, so nothing has been sent. Please check back soon.',
  success: 'Thank you. Your request has been sent to the Beauty Obsessed team.',
  error: 'Something went wrong and your request was not sent. Please try again.',
};

const NOTIFY_MESSAGES = {
  invalid: 'Please enter a valid email address, for example name@example.com.',
  unavailable: 'Episode alerts are not open yet, so your email has not been saved. Please check back soon.',
  success: 'Thank you. You will hear about every new episode.',
  error: 'Something went wrong and you have not been added. Please try again.',
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.reason) errors.reason = 'Please choose what you would like to do.';
  if (!values.message.trim()) errors.message = 'Please write a short message.';
  if (!values.consent) errors.consent = 'Please agree to be contacted so the team can reply.';
  return errors;
}

// Topic and guest suggestions. Like every form on the site, it only reports
// success when its endpoint (data/site.js) accepts the request.
function GuestForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const id = useId();
  const field = (name) => `${id}-${name}`;

  const update = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  async function onSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(field(first))?.focus();
      return;
    }
    if (!guestRequestEndpoint) {
      setStatus('unavailable');
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch(guestRequestEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  const describedBy = (name) => (errors[name] ? `${field(name)}-error` : undefined);
  const error = (name) =>
    errors[name] && (
      <span className="pod-form__error" id={`${field(name)}-error`}>
        {errors[name]}
      </span>
    );

  return (
    <div className="card pod-form">
      <h2 className="ebk-card-title pod-form__title" id={`${id}-title`}>
        {guestForm.title}
      </h2>
      <p className="pod-form__intro">{guestForm.copy}</p>

      <form className="pod-form__grid" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
        <div className="pod-field">
          <label className="sr-only" htmlFor={field('name')}>Your name</label>
          <input id={field('name')} className="pod-input" placeholder="Your name" autoComplete="name" value={values.name} onChange={update('name')} aria-invalid={Boolean(errors.name) || undefined} aria-describedby={describedBy('name')} />
          {error('name')}
        </div>
        <div className="pod-field">
          <label className="sr-only" htmlFor={field('email')}>Your email</label>
          <input id={field('email')} className="pod-input" type="email" inputMode="email" placeholder="Your email" autoComplete="email" value={values.email} onChange={update('email')} aria-invalid={Boolean(errors.email) || undefined} aria-describedby={describedBy('email')} />
          {error('email')}
        </div>
        <div className="pod-field">
          <label className="sr-only" htmlFor={field('reason')}>I want to…</label>
          <select id={field('reason')} className="pod-input pod-select" value={values.reason} onChange={update('reason')} aria-invalid={Boolean(errors.reason) || undefined} aria-describedby={describedBy('reason')}>
            <option value="">I want to…</option>
            {guestForm.reasons.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
          {error('reason')}
        </div>
        <div className="pod-field pod-field--wide">
          <label className="sr-only" htmlFor={field('message')}>Your message</label>
          <textarea id={field('message')} className="pod-input pod-textarea" rows={2} placeholder="Your message" value={values.message} onChange={update('message')} aria-invalid={Boolean(errors.message) || undefined} aria-describedby={describedBy('message')} />
          {error('message')}
        </div>
        <div className="pod-field pod-field--wide">
          <label className="sr-only" htmlFor={field('link')}>Instagram or YouTube link (optional)</label>
          <input id={field('link')} className="pod-input" type="url" placeholder="Instagram or YouTube link (optional)" value={values.link} onChange={update('link')} />
        </div>

        <div className="pod-form__foot">
          <div className="pod-field">
            <label className="pod-consent" htmlFor={field('consent')}>
              <input id={field('consent')} type="checkbox" checked={values.consent} onChange={update('consent')} aria-invalid={Boolean(errors.consent) || undefined} aria-describedby={describedBy('consent')} />
              I agree to be contacted by the Beauty Obsessed team.
            </label>
            {error('consent')}
          </div>
          <Button type="submit" disabled={status === 'submitting'} aria-busy={status === 'submitting' || undefined}>
            {status === 'submitting' ? 'Sending…' : 'Send Request'}
          </Button>
        </div>

        <p className="pod-form__status" role="status" data-status={status}>
          {REQUEST_MESSAGES[status] ?? ''}
        </p>
      </form>
    </div>
  );
}

function NotifyPanel() {
  const { email, status, inputRef, onChange, onSubmit } = useEmailSignup(newsletterEndpoint);
  const id = useId();

  return (
    <div className="pod-notify" id="notify">
      <h2 className="pod-notify__title" id={`${id}-title`}>
        {notify.title}
      </h2>
      <p className="pod-notify__copy">{notify.copy}</p>

      <form className="pod-notify__form" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
        <label className="sr-only" htmlFor={`${id}-email`}>Email address</label>
        <input
          ref={inputRef}
          id={`${id}-email`}
          className="pod-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={onChange}
          aria-invalid={status === 'invalid' || undefined}
          aria-describedby={`${id}-message`}
        />
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Notify Me'}
        </Button>
      </form>
      <p className="pod-notify__message" id={`${id}-message`} role="status" data-status={status}>
        {NOTIFY_MESSAGES[status] ?? ''}
      </p>

      <SmartLink to={youtubeChannel.url} className="pod-notify__yt">
        <YoutubeIcon />
        <span>Subscribe on YouTube</span>
        <span className="pod-notify__handle">{youtubeChannel.handle}</span>
      </SmartLink>
    </div>
  );
}

export default function GetInvolved() {
  return (
    <div className="ebk-section">
      <div className="ebk-container pod-involve">
        <GuestForm />
        <NotifyPanel />
      </div>
    </div>
  );
}
