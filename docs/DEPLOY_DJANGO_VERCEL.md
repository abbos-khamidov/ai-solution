# Deploy Django + Next.js on Vercel

This project now uses:

- `Next.js` frontend (project root)
- `Django` backend (`backend/`)

Deploy as **2 separate Vercel projects**.

## 1. Deploy Django backend (Vercel project #1)

1. In Vercel: **Add New Project**
2. Select this repository
3. Set **Root Directory** to `backend`
4. Vercel will use `backend/vercel.json`
5. Add backend env vars:

```env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=your-strong-secret
DJANGO_ALLOWED_HOSTS=your-backend.vercel.app
DJANGO_CSRF_TRUSTED_ORIGINS=https://ai-solution-amber.vercel.app
DJANGO_CORS_ALLOWED_ORIGINS=https://ai-solution-amber.vercel.app
DATABASE_URL=postgresql://...

TELEGRAM_BOT_TOKEN=...
TELEGRAM_PERSONAL_CHAT_ID=...
TELEGRAM_GROUP_CHAT_ID=...

RESEND_API_KEY=...
EMAIL_FROM=onboarding@resend.dev
LEADS_EMAIL_TO=your@email.com
```

6. Deploy backend and copy URL, for example:
   `https://ai-solution-backend.vercel.app`

## 2. Run migrations (one-time / when models change)

Run from local machine against production `DATABASE_URL`:

```bash
cd backend
python manage.py migrate
```

## 3. Deploy Next.js frontend (Vercel project #2)

1. Existing frontend project can stay in repo root.
2. Add/update frontend env vars:

```env
NEXT_PUBLIC_SITE_URL=https://ai-solution-amber.vercel.app
DJANGO_API_BASE_URL=https://ai-solution-backend.vercel.app
```

3. Redeploy frontend.

## 4. Verify flow

1. Open site and submit any form.
2. Confirm lead arrives:
   - first to personal Telegram chat
   - then to group chat
3. If Telegram fails, confirm fallback email arrives.
4. Check Django admin:
   `https://ai-solution-backend.vercel.app/admin/`

## 5. Important security note

If bot token was shared in public chat/messages, rotate it in `@BotFather` before production launch.
