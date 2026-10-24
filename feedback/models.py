from django.conf import settings
from django.db import models


class Feedback(models.Model):

    CATEGORY_CHOICES = [
        ("website", "Website"),
        ("jobs", "Jobs"),
        ("events", "Events"),
        ("technical", "Technical Issue"),
        ("suggestion", "Suggestion"),
        ("other", "Other"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_review", "In Review"),
        ("resolved", "Resolved"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="feedbacks"
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    rating = models.PositiveSmallIntegerField()

    message = models.TextField(max_length=2000)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.category} - {self.rating}"

    class Meta:
        ordering = ["-created_at"]