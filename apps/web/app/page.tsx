'use client';

import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      const res = await fetch('http://localhost:4000/api/v1/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("You're on the waitlist!");
        setEmail('');
      } else {
        alert('Failed');
        console.log(data);
      }
    } catch (err) {
      console.error(err);
      alert('Error');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>OpsCord Waitlist</h1>

      <form onSubmit={handleWaitlist}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
