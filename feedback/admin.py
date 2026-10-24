from django.contrib import admin
from .models import Feedback


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "category",
        "rating",
        "status",
        "created_at",
    )

    list_filter = ("category", "rating", "status", "created_at")
    search_fields = ("user__username", "message")
    readonly_fields = ("created_at",)
