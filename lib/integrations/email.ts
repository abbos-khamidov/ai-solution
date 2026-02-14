interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendWithResend(options: EmailOptions): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('[email] Missing RESEND_API_KEY - email fallback disabled');
    return { ok: false };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[email] Send failed:', result);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error('[email] Error:', error);
    return { ok: false };
  }
}
