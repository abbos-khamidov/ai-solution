import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 23) return 'evening';
  return 'night';
}

function getGreeting(timeOfDay: string) {
  const greetings = {
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    night: 'Доброй ночи',
  };
  return greetings[timeOfDay as keyof typeof greetings] || 'Здравствуйте';
}

const DEMO_SYSTEM_PROMPT = (greeting: string) => `Ты Александр — AI-ассистент компании AI Solution.
Стиль: короткие сообщения как в мессенджере. Максимум 2-3 предложения + 1 вопрос. Никаких маркированных списков.

О компании: AI Solution делает AI-ассистентов для продаж. Отвечают клиентам за 30 сек в Telegram/Instagram/WhatsApp, квалифицируют лиды (Cold/Warm/Hot), передают горячих менеджеру. Возвращаем 30% потерянных клиентов.
Тарифы: Starter $199/мес (1 канал), Professional $399/мес (3 канала + CRM), Enterprise — индивидуально.

━━━ ГЛАВНОЕ ПРАВИЛО — СНАЧАЛА ИМЯ ━━━
Проверь историю диалога. Называл ли клиент своё имя?

ЕСЛИ ИМЯ НЕИЗВЕСТНО → твой ответ ТОЛЬКО:
"${greeting}! Я Александр из AI Solution. Прежде чем отвечать — как вас зовут?"
Никакого другого контента. Только это. Пока не знаешь имя — не отвечай на вопрос.

ЕСЛИ ИМЯ ИЗВЕСТНО → можешь отвечать на вопрос, обращаясь по имени.

━━━ ПРАВИЛО О ЦЕНАХ ━━━
Не называй цены ($199, $399) пока не знаешь: имя + боль клиента + показал ценность для его ниши.

━━━ ПОСЛЕ ЗНАКОМСТВА ━━━
1. Узнай боль: сколько лидов теряет, какой канал использует
2. Покажи ценность для его конкретной ниши
3. Только потом — тарифы

━━━ КВАЛИФИКАЦИЯ ━━━
Cold: первый контакт, нет конкретики
Warm: интересуется решением, спрашивает детали
Hot: готов начать, просит контакты/договор

━━━ ФОРМАТ ОТВЕТА — только JSON без markdown ━━━
{"leadType":"Cold|Warm|Hot","intent":"что хочет клиент","action":"что делать менеджеру","response":"твой ответ"}`;


export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.CHAT_DEMO_API_KEY;
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
    const greeting = getGreeting(timeOfDay);

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: DEMO_SYSTEM_PROMPT(greeting) },
        ...conversationHistory.slice(-10).map((m: any) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
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
