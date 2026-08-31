from django.db import models
from accounts.models import CustomUser


class Conversation(models.Model):

    student = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="student_conversations"
    )

    alumni = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="alumni_conversations"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]
        unique_together = ("student", "alumni")

    def __str__(self):
        return f"{self.student.username} ↔ {self.alumni.username}"


class Message(models.Model):

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages"
    )

    sender = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE
    )

    message = models.TextField()

    is_seen = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.sender.username}"