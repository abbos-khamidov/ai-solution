import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CHAT_SYSTEM_PROMPT } from '@/lib/chat/systemPrompt';

function maskApiKey(value: string) {
  const cleaned = value.trim().replace(/\s+/g, '');
  if (!cleaned) return 'empty';
  return `${cleaned.slice(0, 10)}... (len=${cleaned.length})`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = (process.env.OPENAI_API_KEY || '').trim().replace(/\s+/g, '');
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chat is not configured. Missing OPENAI_API_KEY.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const messages = body.messages as Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        ...messages.slice(-20).map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ message: content });
  } catch (err) {
    console.error('Chat API error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    const isKeyError = /API key|invalid.*key|authorization/i.test(message);
    if (isKeyError) {
      console.error('OPENAI_API_KEY diagnostic:', {
        key: maskApiKey(process.env.OPENAI_API_KEY || ''),
      });
    }
    const errorText = isKeyError
      ? 'Неверный или недействительный ключ OpenAI. Проверьте OPENAI_API_KEY в .env и перезапустите сервер.'
      : 'Не удалось получить ответ. Попробуйте позже.';
    return NextResponse.json({ error: errorText }, { status: 500 });
  }
}
