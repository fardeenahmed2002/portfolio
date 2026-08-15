import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MessageModel from '@/models/Message';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations/contact';

// Lightweight in-memory rate limiter (per-process, best-effort abuse protection).
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP to mitigate form abuse / spam.
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const raw = await req.json();
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid form data' },
        { status: 400 }
      );
    }
    const { name, email, subject, message } = parsed.data;

    await dbConnect();
    await MessageModel.create({ name, email, subject, message });

    // Optionally send email notification
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Portfolio <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL,
          subject: `New Contact: ${subject ?? 'Portfolio Message'}`,
          html: `<h2>New contact from ${name}</h2><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
        });
      } catch { /* Email sending is non-critical */ }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
