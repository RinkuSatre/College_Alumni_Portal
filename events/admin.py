from django.contrib import admin
from .models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "event_type",
        "event_date",
        "venue",
        "status",
        "created_by",
    )

    list_filter = (
        "event_type",
        "status",
        "event_date",
    )

    search_fields = (
        "title",
        "venue",
    )


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):

    list_display = (
        "event",
        "user",
        "attendance_status",
        "registered_at",
    )

    list_filter = (
        "attendance_status",
    )

    search_fields = (
        "user__username",
        "event__title",
    )
    
