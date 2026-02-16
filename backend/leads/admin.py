from django.contrib import admin

from .models import LeadEvent


@admin.register(LeadEvent)
class LeadEventAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "endpoint",
        "service",
        "status",
        "name",
        "email",
        "phone",
        "telegram_personal_ok",
        "telegram_group_ok",
        "email_ok",
    )
    list_filter = ("status", "endpoint", "service", "language", "created_at")
    search_fields = ("name", "email", "phone", "message", "delivery_error")
    readonly_fields = ("created_at", "updated_at")
