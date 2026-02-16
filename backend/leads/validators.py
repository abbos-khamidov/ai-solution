from __future__ import annotations

from typing import Any


MAX_LEN = {
    "name": 120,
    "email": 254,
    "phone": 64,
    "company": 160,
    "message": 4000,
    "service": 64,
    "language": 16,
    "source": 64,
    "website": 255,
}


def _clean_text(value: Any, field: str) -> str:
    text = (value or "").strip()
    return text[: MAX_LEN[field]]


def _as_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "on"}
    return False


def validate_payload(payload: dict[str, Any], endpoint: str) -> tuple[dict[str, Any], list[str]]:
    data = {
        "name": _clean_text(payload.get("name"), "name"),
        "email": _clean_text(payload.get("email"), "email"),
        "phone": _clean_text(payload.get("phone"), "phone"),
        "company": _clean_text(payload.get("company"), "company"),
        "message": _clean_text(payload.get("message"), "message"),
        "service": _clean_text(payload.get("service"), "service") or "general",
        "language": _clean_text(payload.get("language"), "language") or "en",
        "source": _clean_text(payload.get("source"), "source") or endpoint,
        "website": _clean_text(payload.get("website"), "website"),
        "consent": _as_bool(payload.get("consent")),
    }

    errors: list[str] = []

    if endpoint == "contact":
        if not data["name"]:
            errors.append("name is required")
        if not data["email"]:
            errors.append("email is required")

    if not data["phone"] and not data["email"]:
        errors.append("phone or email is required")

    if not data["consent"]:
        errors.append("consent must be true")

    if data["email"] and "@" not in data["email"]:
        errors.append("email is invalid")

    return data, errors
