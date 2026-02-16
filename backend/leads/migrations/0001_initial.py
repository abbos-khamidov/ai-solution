from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="LeadEvent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("endpoint", models.CharField(default="lead", max_length=32)),
                ("source", models.CharField(blank=True, default="", max_length=64)),
                ("service", models.CharField(blank=True, default="", max_length=64)),
                ("language", models.CharField(blank=True, default="en", max_length=16)),
                ("name", models.CharField(blank=True, default="", max_length=120)),
                ("email", models.EmailField(blank=True, default="", max_length=254)),
                ("phone", models.CharField(blank=True, default="", max_length=64)),
                ("company", models.CharField(blank=True, default="", max_length=160)),
                ("message", models.TextField(blank=True, default="")),
                ("consent", models.BooleanField(default=False)),
                ("honeypot_triggered", models.BooleanField(default=False)),
                ("ip_address", models.CharField(blank=True, default="", max_length=64)),
                ("user_agent", models.TextField(blank=True, default="")),
                ("telegram_personal_ok", models.BooleanField(default=False)),
                ("telegram_group_ok", models.BooleanField(default=False)),
                ("email_ok", models.BooleanField(default=False)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("received", "Received"),
                            ("delivered", "Delivered"),
                            ("partial", "Partial"),
                            ("failed", "Failed"),
                            ("honeypot", "Honeypot"),
                        ],
                        default="received",
                        max_length=16,
                    ),
                ),
                ("delivery_error", models.TextField(blank=True, default="")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
