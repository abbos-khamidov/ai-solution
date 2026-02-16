from __future__ import annotations

import html
import os
from datetime import datetime, timezone
from typing import Any

import requests


def _format_message(payload: dict[str, Any]) -> str:
    created_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    lines = [
        "<b>New Lead</b>",
        "",
        f"<b>Form:</b> {html.escape(payload.get('source', 'unknown'))}",
        f"<b>Service:</b> {html.escape(payload.get('service', 'general'))}",
        f"<b>Language:</b> {html.escape(payload.get('language', 'en'))}",
        f"<b>Consent:</b> {'yes' if payload.get('consent') else 'no'}",
        "",
        f"<b>Name:</b> {html.escape(payload.get('name') or '-')}",
        f"<b>Email:</b> {html.escape(payload.get('email') or '-')}",
        f"<b>Phone:</b> {html.escape(payload.get('phone') or '-')}",
        f"<b>Company:</b> {html.escape(payload.get('company') or '-')}",
        f"<b>Message:</b> {html.escape(payload.get('message') or '-')}",
        "",
        f"<b>Time:</b> {created_at}",
    ]
    return "\n".join(lines)


def _send_telegram_message(token: str, chat_id: str, text: str) -> bool:
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    resp = requests.post(
        url,
        json={"chat_id": chat_id, "text": text, "parse_mode": "HTML"},
        timeout=10,
    )
    return resp.status_code == 200 and resp.json().get("ok", False)


def send_to_telegram(payload: dict[str, Any]) -> tuple[bool, bool, str]:
    token = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
    personal_chat_id = os.getenv("TELEGRAM_PERSONAL_CHAT_ID", "").strip()
    group_chat_id = os.getenv("TELEGRAM_GROUP_CHAT_ID", "").strip()

    if not token or not personal_chat_id or not group_chat_id:
        return False, False, "missing telegram env vars"

    text = _format_message(payload)

    try:
        personal_ok = _send_telegram_message(token, personal_chat_id, text)
        group_ok = _send_telegram_message(token, group_chat_id, text)
        return personal_ok, group_ok, ""
    except Exception as exc:  # noqa: BLE001
        return False, False, str(exc)


def send_email_fallback(payload: dict[str, Any]) -> tuple[bool, str]:
    api_key = os.getenv("RESEND_API_KEY", "").strip()
    to_email = os.getenv("LEADS_EMAIL_TO", "").strip()
    from_email = os.getenv("EMAIL_FROM", "onboarding@resend.dev").strip()

    if not api_key or not to_email:
        return False, "missing email env vars"

    subject = f"Lead fallback: {payload.get('service') or payload.get('source') or 'unknown'}"
    html_body = (
        f"<h3>Lead fallback</h3>"
        f"<p><b>Form:</b> {html.escape(payload.get('source', 'unknown'))}</p>"
        f"<p><b>Service:</b> {html.escape(payload.get('service', 'general'))}</p>"
        f"<p><b>Name:</b> {html.escape(payload.get('name') or '-')}</p>"
        f"<p><b>Email:</b> {html.escape(payload.get('email') or '-')}</p>"
        f"<p><b>Phone:</b> {html.escape(payload.get('phone') or '-')}</p>"
        f"<p><b>Message:</b> {html.escape(payload.get('message') or '-')}</p>"
    )

    try:
        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": from_email,
                "to": to_email,
                "subject": subject,
                "html": html_body,
            },
            timeout=10,
        )
        if response.status_code >= 400:
            return False, response.text
        return True, ""
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)
