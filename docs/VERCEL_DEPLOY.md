# Деплой на Vercel

## Срочно: чат-ассистент не работает (Missing OPENAI_API_KEY)

Если в деплое видите «Ассистент временно недоступен» или «Missing OPENAI_API_KEY»:

1. Зайдите в [Vercel Dashboard](https://vercel.com) → ваш проект (например **ai-solution-amber**).
2. **Settings** → **Environment Variables**.
3. Добавьте переменную:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** ваш ключ OpenAI (начинается с `sk-proj-...`), без пробелов и кавычек.
   - **Environment:** отметьте **Production** (и при необходимости **Preview**).
4. Сохраните (**Save**).
5. **Redeploy:** вкладка **Deployments** → у последнего деплоя три точки **⋯** → **Redeploy** (без кэша). Или сделайте новый коммит и пуш — Vercel задеплоит сам.

После редеплоя чат на сайте начнёт работать.

---

## Переменные окружения (Environment Variables)

В **Vercel** → проект → **Settings** → **Environment Variables** задайте:

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Да | URL сайта (например `https://ai-solution-amber.vercel.app` или ваш домен). Нужен для OG, sitemap, метаданных. |
| `OPENAI_API_KEY` | Для чат-ассистента | Ключ OpenAI для встроенного чат-ассистента. Без него чат вернёт ошибку. |
| `DJANGO_API_BASE_URL` | Для форм | URL бэкенда Django (например `https://your-backend.vercel.app` или отдельный хост). Нужен для работы форм: Hero (обратный звонок), CTA на страницах услуг, блок «Контакты». Без него запросы к `/api/lead` и `/api/contact` вернут 503. |

## Что куда стучится

- **Формы (заявки, контакты):** браузер → Next.js `/api/lead`, `/api/contact` → **Django backend** (`DJANGO_API_BASE_URL`).
- **Чат-ассистент:** браузер → Next.js `/api/chat` → **OpenAI API** (ключ только на сервере).

## Чеклист перед деплоем

1. Задать в Vercel все переменные выше (Production и при необходимости Preview).
2. Бэкенд Django должен быть доступен по `DJANGO_API_BASE_URL` (отдельный деплой или тот же проект, если настроен).
3. После деплоя проверить: главная (форма в Hero), любая страница услуги (форма внизу), блок «Контакты», чат-ассистент (кнопка слева внизу).

## Если бэкенд ещё не развёрнут

Если `DJANGO_API_BASE_URL` не задан, формы вернут **503** и на фронте будет ошибка (toast). Сайт и чат (при наличии `OPENAI_API_KEY`) работают; заявки просто не будут уходить в бэкенд до настройки URL.

---

## Форма не работает на Vercel — чеклист

Если при отправке формы появляется ошибка:

### 1. Проверьте `DJANGO_API_BASE_URL` в Vercel

- Vercel Dashboard → проект (frontend) → **Settings** → **Environment Variables**
- Должна быть переменная `DJANGO_API_BASE_URL` со значением **публичного URL** Django backend.
- **Важно:** `http://127.0.0.1:8000` работает только локально. На Vercel используйте URL деплоя backend (например `https://ai-solution-backend.vercel.app`).
- Environment: отметьте **Production** (и Preview, если нужно).
- После изменения переменных — **Redeploy** (Deployments → ⋯ → Redeploy без кэша).

### 2. Бэкенд должен быть развёрнут и доступен

- Django нужно задеплоить отдельно (второй проект Vercel с Root Directory = `backend`, см. `docs/DEPLOY_DJANGO_VERCEL.md`).
- Проверьте, что `https://ваш-backend.vercel.app/api/health` возвращает `{"ok":true}`.

### 3. CORS и Allowed Hosts на бэкенде

В env бэкенда должны быть:

- `DJANGO_ALLOWED_HOSTS` — включает домен backend и frontend (через запятую).
- `DJANGO_CORS_ALLOWED_ORIGINS` — включает `https://ai-solution-amber.vercel.app` (ваш frontend).
- `DJANGO_CSRF_TRUSTED_ORIGINS` — то же.

---

## Бот молчит, в группу ничего не отправляется

### 1. Переменные Telegram на бэкенде

В **env бэкенда** (Vercel backend project или Render/Railway и т.п.) должны быть заданы:

- `TELEGRAM_BOT_TOKEN` — токен от @BotFather
- `TELEGRAM_PERSONAL_CHAT_ID` — ID личного чата
- `TELEGRAM_GROUP_CHAT_ID` — ID группы (формат `-100xxxxxxxxxx` для супергрупп)

Они задаются **на хостинге бэкенда**, не на frontend.

### 2. Бот добавлен в группу

- Бот должен быть добавлен в группу/супергруппу.
- Рекомендуется выдать права администратора, чтобы он мог отправлять сообщения.

### 3. Правильный ID группы

- Супергруппы имеют ID вида `-100xxxxxxxxxx`.
- Чтобы узнать ID: добавьте @userinfobot в группу или используйте `getUpdates` API после сообщения в группе.

### 4. Бэкенд получает запрос, но Telegram падает

- Проверьте логи бэкенда на хостинге — там будет сообщение об ошибке (например `missing telegram env vars` или текст исключения).
- При `missing telegram env vars` — проверьте, что переменные Telegram заданы и не содержат лишних пробелов.
- В Django Admin (`/admin/`) → Lead Events можно посмотреть поле `delivery_error` — там сохраняется причина ошибки для каждой заявки.
