# Деплой на Vercel

## Подключение репозитория

1. [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Импортируйте репозиторий GitHub (`abbos-khamidov/ai-solution` или ваш fork).
3. **Framework Preset:** Vercel определит Next.js автоматически (в проекте есть `vercel.json`).
4. **Root Directory:** оставьте пустым (корень репозитория).
5. **Build Command:** `npm run build` (уже задан в `vercel.json`).
6. **Output Directory:** не менять (Next.js по умолчанию).

## Переменные окружения

В **Settings → Environment Variables** добавьте:

| Переменная | Обязательно | Описание |
|------------|--------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Да (для продакшена) | Полный URL сайта, например `https://your-app.vercel.app` или ваш домен. Нужен для корректных Open Graph, метаданных и ссылок. |

Остальные переменные (Telegram, Resend и т.д.) — по мере подключения интеграций; сейчас форма заявок работает через `/api/lead` с логированием.

## Что уже настроено в проекте

- **vercel.json** — framework Next.js, заголовки безопасности (X-Frame-Options, CSP-ориентированные), кэш для `/_next/static` и шрифтов, регион по умолчанию.
- **next.config.mjs** — без `output: 'export'` (используются API routes), сжатие и оптимизация включены.
- **.env** и **.env.local** в `.gitignore` — секреты не попадают в репозиторий.

## После деплоя

1. Проверьте главную и страницы услуг.
2. Убедитесь, что `NEXT_PUBLIC_SITE_URL` совпадает с реальным URL (иначе превью в соцсетях могут быть неверными).
3. При подключении домена настройте его в Vercel и при необходимости обновите `NEXT_PUBLIC_SITE_URL` на новый домен.
