import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const toEmail = 'samuel.lazier.robertson+website@gmail.com';

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const user = process.env.GOOGLE_WORKSPACE_SMTP_USER;
    const pass = process.env.GOOGLE_WORKSPACE_SMTP_APP_PASSWORD;

    if (!user || !pass) {
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"samrobertson.dev contact" <${user}>`,
      to: toEmail,
      replyTo: user,
      subject: `Website contact from ${name}`,
      text: `Name: ${name}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
