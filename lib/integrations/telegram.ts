import type { ContactFormData } from '@/lib/schema/contact';

export async function sendToTelegram(data: ContactFormData): Promise<{ ok: boolean }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return { ok: false };
  }

  try {
    const message = `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.message ? `💬 <b>Message:</b> ${escapeHtml(data.message)}` : ''}

⏰ <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const result = await response.json();
    
    if (!response.ok || !result.ok) {
      console.error('[telegram] Send failed:', result);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error('[telegram] Error:', error);
    return { ok: false };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
