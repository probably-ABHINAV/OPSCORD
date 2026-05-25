import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const waitlist = new Hono();

waitlist.post('/', async (c) => {
  try {
    const body = await c.req.json();

    if (!body?.email) {
      return c.json({ success: false, error: 'Email required' }, 400);
    }

    try {
      const user = await prisma.waitlistUser.create({
        data: {
          email: body.email,
        },
      });

      return c.json({
        success: true,
        source: 'database',
        user,
      });
    } catch (dbErr) {
      console.error('DB INSERT FAILED:', dbErr);

      return c.json({
        success: true,
        source: 'mock',
        email: body.email,
      });
    }
  } catch (err) {
    console.error(err);

    return c.json(
      {
        success: false,
        error: 'Invalid request',
      },
      400
    );
  }
});

export default waitlist;
