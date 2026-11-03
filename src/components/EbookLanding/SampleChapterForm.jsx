import { useId } from 'react';
import { ScrollText } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { sampleChapterEndpoint } from '../../data/site.js';
import useEmailSignup from '../../hooks/useEmailSignup.js';

const MESSAGES = {
  invalid: 'Please enter a valid email address, for example name@example.com.',
  unavailable: 'Sample chapters are not being sent out yet, so your email has not been saved. Please check back soon.',
  success: 'Thank you. Your sample chapter is on its way to your inbox.',
  error: 'Something went wrong and the sample was not sent. Please try again.',
};

// Free sample chapter request. It only reports success when
// `sampleChapterEndpoint` (see data/site.js) accepts the email address.
export default function SampleChapterForm() {
  const { email, status, inputRef, onChange, onSubmit } = useEmailSignup(sampleChapterEndpoint);
  const titleId = useId();
  const inputId = useId();
  const messageId = useId();
  const submitting = status === 'submitting';

  return (
    <div className="card sample">
      <ScrollText className="sample__icon" size={46} strokeWidth={1.2} aria-hidden="true" />

      <div>
        <h3 className="ebk-card-title" id={titleId}>
          Get a free sample chapter
        </h3>
        <p className="ebk-card-copy">
          See what&rsquo;s inside before you buy. Enter your email to download a free sample chapter.
        </p>
      </div>

      <form className="sample__form" onSubmit={onSubmit} noValidate aria-labelledby={titleId}>
        <div className="sample__fields">
          <label className="sr-only" htmlFor={inputId}>
            Email address
          </label>
          <input
            ref={inputRef}
            id={inputId}
            className="sample__input"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Your email address"
            required
            value={email}
            aria-invalid={status === 'invalid' || undefined}
            aria-describedby={messageId}
            onChange={onChange}
          />
          <Button type="submit" disabled={submitting} aria-busy={submitting || undefined}>
            {submitting ? 'Sending…' : 'Send me a sample'}
          </Button>
        </div>

        <p id={messageId} className="sample__message" data-status={status} role="status">
          {MESSAGES[status] ?? ''}
        </p>
      </form>
    </div>
  );
}
