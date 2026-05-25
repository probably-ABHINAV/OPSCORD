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
        alert('Failed to join waitlist');
        console.log(data);
      }
    } catch (err) {
      console.error(err);
      alert('Error joining waitlist');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Join Waitlist</h1>

      <form onSubmit={handleWaitlist} style={{ display: 'flex', gap: 10 }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10 }}
        />

        <button type="submit">Join</button>
      </form>
    </div>
  );
}
