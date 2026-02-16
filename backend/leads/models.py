from django.db import models


class LeadEvent(models.Model):
    STATUS_RECEIVED = "received"
    STATUS_DELIVERED = "delivered"
    STATUS_PARTIAL = "partial"
    STATUS_FAILED = "failed"
    STATUS_HONEYPOT = "honeypot"

    STATUS_CHOICES = [
        (STATUS_RECEIVED, "Received"),
        (STATUS_DELIVERED, "Delivered"),
        (STATUS_PARTIAL, "Partial"),
        (STATUS_FAILED, "Failed"),
        (STATUS_HONEYPOT, "Honeypot"),
    ]

    endpoint = models.CharField(max_length=32, default="lead")
    source = models.CharField(max_length=64, blank=True, default="")
    service = models.CharField(max_length=64, blank=True, default="")
    language = models.CharField(max_length=16, blank=True, default="en")

    name = models.CharField(max_length=120, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    phone = models.CharField(max_length=64, blank=True, default="")
    company = models.CharField(max_length=160, blank=True, default="")
    message = models.TextField(blank=True, default="")

    consent = models.BooleanField(default=False)
    honeypot_triggered = models.BooleanField(default=False)

    ip_address = models.CharField(max_length=64, blank=True, default="")
    user_agent = models.TextField(blank=True, default="")

    telegram_personal_ok = models.BooleanField(default=False)
    telegram_group_ok = models.BooleanField(default=False)
    email_ok = models.BooleanField(default=False)

    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=STATUS_RECEIVED)
    delivery_error = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.service or self.endpoint} | {self.phone or self.email or 'no-contact'}"
