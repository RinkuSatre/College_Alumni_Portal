from django.contrib import admin
from .models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "event_type",
        "event_date",
        "event_time",
        "display_status",
        "capacity",
        "created_by",
    )

    list_filter = (
        "event_type",
        "event_date",
    )

    search_fields = (
        "title",
        "description",
        "venue",
        "created_by__username",
    )

    def display_status(self, obj):
        return obj.calculated_status

    display_status.short_description = "Status"


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
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
    
