# Django Backend

Backend for form processing, anti-spam, Telegram delivery, email fallback, and admin/audit.

## Local run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

## API

- `POST /api/lead`
- `POST /api/contact`
- `GET /api/health`

## Required payload fields

- `consent: true`
- `phone` or `email`
- `website` (honeypot, optional)

## Telegram flow

1. send to personal chat (`TELEGRAM_PERSONAL_CHAT_ID`)
2. send to group (`TELEGRAM_GROUP_CHAT_ID`)
3. fallback to Resend email on Telegram failure
