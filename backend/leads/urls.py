from django.urls import path

from .views import contact, health, lead


urlpatterns = [
    path("api/lead", lead, name="lead"),
    path("api/lead/", lead, name="lead-slash"),
    path("api/contact", contact, name="contact"),
    path("api/contact/", contact, name="contact-slash"),
    path("api/health", health, name="health"),
]
