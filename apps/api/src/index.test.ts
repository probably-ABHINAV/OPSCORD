import { app } from './index';

const BASE_URL = 'http://localhost:4000';

async function testHealthCheck() {
  const res = await fetch(`${BASE_URL}/`);

  const data = await res.json();

  console.log('HEALTH CHECK:', data);

  if (!res.ok) {
    throw new Error('Health check failed');
  }
}

async function testWaitlistSuccess() {
  const res = await fetch(`${BASE_URL}/api/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
    }),
  });

  const data = await res.json();

  console.log('WAITLIST SUCCESS:', data);

  if (!res.ok) {
    throw new Error('Waitlist success test failed');
  }
}

async function testWaitlistFail() {
  const res = await fetch(`${BASE_URL}/api/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();

  console.log('WAITLIST FAIL (expected):', data);

  if (res.ok) {
    throw new Error('Waitlist validation test failed');
  }
}

async function runTests() {
  try {
    console.log('🚀 Starting API tests...\n');

    await testHealthCheck();
    await testWaitlistSuccess();
    await testWaitlistFail();

    console.log('\n✅ ALL TESTS PASSED');
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err);
    process.exit(1);
  }
}

runTests();
