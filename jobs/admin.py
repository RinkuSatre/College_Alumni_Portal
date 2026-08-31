from django.contrib import admin
from .models import Job, JobApplication


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "company_name",
        "location",
        "job_type",
        "last_date",
        "is_active",
    )

    list_filter = (
        "job_type",
        "is_active",
    )

    search_fields = (
        "title",
        "company_name",
        "location",
    )


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "job",
        "status",
        "applied_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "student__username",
        "job__title",
    )