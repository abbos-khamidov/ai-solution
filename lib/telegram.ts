export async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  const recipients = [
    process.env.TELEGRAM_CHAT_ID,
    process.env.TELEGRAM_GROUP_ID,
  ].filter(Boolean) as string[];

  if (recipients.length === 0) return;

  await Promise.allSettled(
    recipients.map((chat_id) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text, parse_mode: 'HTML' }),
      }).then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          console.error(`[Telegram] error for ${chat_id}:`, err);
        }
      })
    )
  );
}

// ── helpers ────────────────────────────────────────────────────────────────

export function fmtContact(data: {
  name?: string;
  contact?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}) {
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });
  return [
    '📋 <b>Новая заявка — контактная форма</b>',
    `🕐 ${now}`,
    '',
    data.name    ? `👤 Имя: ${data.name}`                      : null,
    data.contact ? `📬 Контакт: ${data.contact}`               : null,
    data.email   ? `📧 Email: ${data.email}`                   : null,
    data.phone   ? `📱 Телефон: ${data.phone}`                 : null,
    data.company ? `🏢 Компания: ${data.company}`              : null,
    data.message ? `💬 Сообщение:\n${data.message}`            : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export function fmtLead(data: {
  phone?: string;
  name?: string;
  [key: string]: unknown;
}) {
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });
  return [
    '🔥 <b>Новый лид — форма обратного звонка</b>',
    `🕐 ${now}`,
    '',
    data.phone ? `📱 Телефон: ${data.phone}` : null,
    data.name  ? `👤 Имя: ${data.name}`      : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export function fmtChatMessage(opts: {
  source: 'widget' | 'demo';
  userMessage: string;
  leadType?: string;
  historyLen: number;
}) {
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });
  const isFirst = opts.historyLen === 0;
  const leadEmoji =
    opts.leadType === 'Hot'  ? '🔥' :
    opts.leadType === 'Warm' ? '🌡' :
    opts.leadType === 'Cold' ? '🧊' : '';

  const tag =
    opts.source === 'demo'
      ? `💬 <b>Чат-демо${isFirst ? ' (новый диалог)' : ''}</b>${leadEmoji ? ` ${leadEmoji} ${opts.leadType}` : ''}`
      : `💬 <b>Чат-виджет${isFirst ? ' (новый диалог)' : ''}</b>`;

  return [
    tag,
    `🕐 ${now}`,
    '',
    `👤 Сообщение: ${opts.userMessage.slice(0, 500)}`,
  ].join('\n');
}
