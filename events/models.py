from django.db import models
from django.utils import timezone
from accounts.models import CustomUser


EVENT_TYPE_CHOICES = (
    ("Alumni Meet", "Alumni Meet"),
    ("Workshop", "Workshop"),
    ("Seminar", "Seminar"),
    ("Webinar", "Webinar"),
    ("Placement Drive", "Placement Drive"),
    ("Cultural Event", "Cultural Event"),
    ("Other", "Other"),
)

EVENT_STATUS_CHOICES = (
    ("Upcoming", "Upcoming"),
    ("Ongoing", "Ongoing"),
    ("Completed", "Completed"),
    ("Cancelled", "Cancelled"),
)

ATTENDANCE_STATUS = (
    ("Registered", "Registered"),
    ("Attended", "Attended"),
    ("Absent", "Absent"),
)


class Event(models.Model):

    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="events"
    )

    title = models.CharField(max_length=150)
    description = models.TextField()

    event_type = models.CharField(
        max_length=50,
        choices=EVENT_TYPE_CHOICES
    )

    event_date = models.DateField()
    event_time = models.TimeField()

    venue = models.CharField(max_length=200)

    capacity = models.PositiveIntegerField()

    registration_deadline = models.DateField()

    banner = models.ImageField(
        upload_to="event_banners/",
        blank=True,
        null=True
    )

    # status = models.CharField(
    #     max_length=20,
    #     choices=EVENT_STATUS_CHOICES,
    #     default="Upcoming"
    # )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["event_date"]

    def __str__(self):
        return self.title

    @property
    def calculated_status(self):
        today = timezone.localdate()

        if self.event_date < today:
            return "Completed"
        elif self.event_date == today:
            return "Ongoing"
        else:
            return "Upcoming"


class EventRegistration(models.Model):

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="registrations"
    )

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="event_registrations"
    )

    attendance_status = models.CharField(
        max_length=20,
        choices=ATTENDANCE_STATUS,
        default="Registered"
    )

    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("event", "user")

    def __str__(self):
        return f"{self.user.username} - {self.event.title}"
