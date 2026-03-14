import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { sendTelegram, fmtChatMessage } from '@/lib/telegram';

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 23) return 'evening';
  return 'night';
}

// Greetings by time of day in all supported languages
const GREETINGS: Record<string, Record<string, string>> = {
  morning:   { ru: 'Доброе утро',   uz: 'Xayrli tong',   en: 'Good morning',  zh: '早上好' },
  afternoon: { ru: 'Добрый день',   uz: 'Xayrli kun',    en: 'Good afternoon',zh: '下午好' },
  evening:   { ru: 'Добрый вечер',  uz: 'Xayrli kech',   en: 'Good evening',  zh: '晚上好' },
  night:     { ru: 'Доброй ночи',   uz: 'Yaxshi kechlar',en: 'Good evening',  zh: '晚上好' },
};

function getGreetings(timeOfDay: string) {
  return GREETINGS[timeOfDay] ?? GREETINGS.afternoon;
}

const DEMO_SYSTEM_PROMPT = (greetings: Record<string, string>) => `Ты Александр — AI-ассистент компании AI Solution.
Стиль: короткие сообщения как в мессенджере. Максимум 2-3 предложения + 1 вопрос. Никаких маркированных списков.

О компании: AI Solution делает AI-ассистентов для продаж. Отвечают клиентам за 30 сек в Telegram/Instagram/WhatsApp, квалифицируют лиды (Cold/Warm/Hot), передают горячих менеджеру. Возвращаем 30% потерянных клиентов.
Тарифы: Starter $199/мес (1 канал), Professional $399/мес (3 канала + CRM), Enterprise — индивидуально.

━━━ ЯЗЫК ОБЩЕНИЯ — КРИТИЧЕСКИ ВАЖНО ━━━
Определи язык по ПЕРВОМУ сообщению пользователя и общайся ТОЛЬКО на нём:
- Узбекский → отвечай по-узбекски (латиница: O'zbek tilida yoz)
- Русский → отвечай по-русски
- Английский → отвечай по-английски
- Другой → отвечай на том же языке
НЕЛЬЗЯ переключаться на другой язык в середине диалога.

━━━ ПРИВЕТСТВИЕ ПО ЯЗЫКУ ━━━
Узбекский: "${greetings.uz}! Men Aleksandr — AI Solution yordamchisi. Ismingiz nima?"
Русский: "${greetings.ru}! Я Александр из AI Solution. Как вас зовут?"
Английский: "${greetings.en}! I'm Alexander from AI Solution. What's your name?"
Другой: адаптируй приветствие под язык пользователя.

━━━ ПРАВИЛО ЗНАКОМСТВА ━━━
Это ПЕРВОЕ сообщение (история пустая)?
→ Поприветствуй на языке пользователя и спроси имя.

Ты УЖЕ спрашивал имя (в истории есть приветствие)?
→ ПРИНЯТЬ любой ответ как имя/обращение. НИКОГДА не повторять вопрос об имени.
→ Сразу переходи к теме.

━━━ ПРАВИЛО О ЦЕНАХ ━━━
Не называй цены пока клиент не рассказал о своей задаче/боли.

━━━ СТРАТЕГИЯ ДИАЛОГА ━━━
1. Познакомился → узнай боль: сколько лидов теряет, какой канал использует
2. Понял боль → покажи ценность конкретно для его ниши
3. Показал ценность → называй тарифы

━━━ КВАЛИФИКАЦИЯ ━━━
Cold: первый контакт, нет конкретики
Warm: интересуется решением, спрашивает детали
Hot: готов начать, просит контакты/договор

━━━ ФОРМАТ ОТВЕТА — только JSON без markdown ━━━
{"leadType":"Cold|Warm|Hot","intent":"что хочет клиент","action":"что делать менеджеру","response":"твой ответ на языке пользователя"}`;


export async function POST(req: NextRequest) {
  try {
    const apiKey = (process.env.CHAT_DEMO_API_KEY || process.env.OPENAI_API_KEY || '').trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API временно недоступен' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    const conversationHistory = Array.isArray(history) ? history : [];

    const timeOfDay = getTimeOfDay();
    const greetings = getGreetings(timeOfDay);

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: DEMO_SYSTEM_PROMPT(greetings) },
        ...conversationHistory.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      max_tokens: 300,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content ?? '{}';

    try {
      const parsed = JSON.parse(content);

      if (!parsed.leadType || !parsed.intent || !parsed.action || !parsed.response) {
        throw new Error('Invalid response structure');
      }

      // Notify on new dialogue or Hot lead (fire-and-forget, don't block response)
      const isNew = conversationHistory.length === 0;
      if (isNew || parsed.leadType === 'Hot') {
        sendTelegram(fmtChatMessage({
          source: 'demo',
          userMessage: message,
          leadType: parsed.leadType,
          historyLen: conversationHistory.length,
        })).catch((err) => console.error('[chat-demo] Telegram notify error:', err));
      }

      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      return NextResponse.json({
        leadType: 'Cold',
        intent: 'Общий вопрос',
        action: 'Ответить на вопрос клиента',
        response: 'Привет! Я Александр из AI Solution. Как вас зовут?',
      });
    }
  } catch (err) {
    console.error('Chat demo API error:', err);
    const errorText = 'Не удалось получить ответ. Попробуйте позже.';
    return NextResponse.json({ error: errorText }, { status: 500 });
  }
}
