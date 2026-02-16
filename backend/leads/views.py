from __future__ import annotations

import json
from typing import Any

from django.core.cache import cache
from django.http import HttpRequest, JsonResponse
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import LeadEvent
from .services import send_email_fallback, send_to_telegram
from .validators import validate_payload


def _client_ip(request: HttpRequest) -> str:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")


def _rate_limited(ip: str, endpoint: str) -> bool:
    key = f"lead-rate:{endpoint}:{ip or 'unknown'}"
    value = cache.get(key, 0)
    if value >= 10:
        return True
    cache.set(key, value + 1, timeout=60)
    return False


def _parse_json(request: HttpRequest) -> dict[str, Any]:
    try:
        return json.loads(request.body.decode("utf-8"))
    except Exception:  # noqa: BLE001
        return {}


def _process_submission(request: HttpRequest, endpoint: str) -> JsonResponse:
    ip = _client_ip(request)
    if _rate_limited(ip, endpoint):
        return JsonResponse({"error": "Too many requests"}, status=429)

    payload = _parse_json(request)
    if not payload:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    data, errors = validate_payload(payload, endpoint)
    honeypot_triggered = bool(data["website"])

    event = LeadEvent.objects.create(
        endpoint=endpoint,
        source=data["source"],
        service=data["service"],
        language=data["language"],
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        company=data["company"],
        message=data["message"],
        consent=data["consent"],
        honeypot_triggered=honeypot_triggered,
        ip_address=ip,
        user_agent=request.META.get("HTTP_USER_AGENT", ""),
        status=LeadEvent.STATUS_HONEYPOT if honeypot_triggered else LeadEvent.STATUS_RECEIVED,
    )

    if honeypot_triggered:
        return JsonResponse({"ok": True})

    if errors:
        event.status = LeadEvent.STATUS_FAILED
        event.delivery_error = "; ".join(errors)
        event.save(update_fields=["status", "delivery_error", "updated_at"])
        return JsonResponse({"error": "Invalid data", "issues": errors}, status=400)

    data["received_at"] = now().isoformat()
    personal_ok, group_ok, tg_error = send_to_telegram(data)
    email_ok = False
    email_error = ""

    if not (personal_ok and group_ok):
        email_ok, email_error = send_email_fallback(data)

    event.telegram_personal_ok = personal_ok
    event.telegram_group_ok = group_ok
    event.email_ok = email_ok

    errors_out = [error for error in [tg_error, email_error] if error]
    if personal_ok and group_ok:
        event.status = LeadEvent.STATUS_DELIVERED
    elif personal_ok or group_ok or email_ok:
        event.status = LeadEvent.STATUS_PARTIAL
    else:
        event.status = LeadEvent.STATUS_FAILED

    event.delivery_error = " | ".join(errors_out)
    event.save(
        update_fields=[
            "telegram_personal_ok",
            "telegram_group_ok",
            "email_ok",
            "status",
            "delivery_error",
            "updated_at",
        ]
    )

    if event.status == LeadEvent.STATUS_FAILED:
        return JsonResponse({"error": "Delivery failed"}, status=502)

    return JsonResponse({"ok": True})


@csrf_exempt
@require_POST
def lead(request: HttpRequest) -> JsonResponse:
    return _process_submission(request, endpoint="lead")


@csrf_exempt
@require_POST
def contact(request: HttpRequest) -> JsonResponse:
    return _process_submission(request, endpoint="contact")


def health(request: HttpRequest) -> JsonResponse:
    return JsonResponse({"ok": True, "service": "django-backend"})
