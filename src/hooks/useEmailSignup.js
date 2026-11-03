import { useRef, useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// State for a one-field email form that posts { email } to `endpoint`.
// status: 'idle' | 'invalid' | 'submitting' | 'unavailable' | 'success' | 'error'
//
// 'success' is only ever reached when the endpoint accepts the request. With
// no endpoint configured the form reports 'unavailable' and sends nothing.
export default function useEmailSignup(endpoint) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);

  const onChange = (event) => {
    setEmail(event.target.value);
    if (status !== 'idle') setStatus('idle');
  };

  async function onSubmit(event) {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus('invalid');
      inputRef.current?.focus();
      return;
    }

    if (!endpoint) {
      setStatus('unavailable');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!response.ok) throw new Error(`Signup request failed: ${response.status}`);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return { email, status, inputRef, onChange, onSubmit };
}
