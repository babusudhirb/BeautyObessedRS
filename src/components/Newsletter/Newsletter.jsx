import { useId, useRef, useState } from 'react';
import Button from '../ui/Button.jsx';
import { newsletterEndpoint } from '../../data/site.js';
import './Newsletter.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGES = {
  invalid: 'Please enter a valid email address, for example name@example.com.',
  unavailable: 'Newsletter sign-ups are not open yet, so your email has not been saved. Please check back soon.',
  success: 'Thank you — you are subscribed.',
  error: 'Something went wrong and you have not been subscribed. Please try again.',
};

// status: 'idle' | 'invalid' | 'submitting' | 'unavailable' | 'success' | 'error'
//
// Success is only ever reported when `newsletterEndpoint` (see data/site.js)
// accepts the request. With no endpoint configured the form says so plainly.
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);
  const inputId = useId();
  const messageId = useId();

  const submitting = status === 'submitting';
  const invalid = status === 'invalid';

  async function handleSubmit(event) {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus('invalid');
      inputRef.current?.focus();
      return;
    }

    if (!newsletterEndpoint) {
      setStatus('unavailable');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(newsletterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!response.ok) throw new Error(`Newsletter request failed: ${response.status}`);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner container">
        <div className="newsletter__text">
          <h2 className="heading newsletter__title" id="newsletter-title">
            Your weekly dose of beauty, without the noise.
          </h2>
          <p className="newsletter__copy">
            Get new articles, podcast episodes, beauty tips and exclusive updates.
          </p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter__fields">
            <label className="sr-only" htmlFor={inputId}>
              Email address
            </label>
            <input
              ref={inputRef}
              id={inputId}
              className="newsletter__input"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Your email address"
              required
              value={email}
              aria-invalid={invalid || undefined}
              aria-describedby={messageId}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
            />
            <Button type="submit" disabled={submitting} aria-busy={submitting || undefined}>
              {submitting ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </div>

          <p id={messageId} className="newsletter__message" data-status={status} role="status">
            {MESSAGES[status] ?? ''}
          </p>
        </form>
      </div>
    </section>
  );
}
