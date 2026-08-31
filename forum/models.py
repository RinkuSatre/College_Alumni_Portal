from django.db import models
from accounts.models import CustomUser


CATEGORY_CHOICES = (
    ("Programming", "Programming"),
    ("Career", "Career"),
    ("Placement", "Placement"),
    ("Higher Studies", "Higher Studies"),
    ("General", "General"),
)


class Question(models.Model):

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="questions"
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="General"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Answer(models.Model):

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    answer = models.TextField()

    is_accepted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Answer by {self.user.username}"


class AnswerLike(models.Model):

    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        related_name="likes"
    )

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE
    )

    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("answer", "user")

    def __str__(self):
        return f"{self.user.username} liked Answer {self.answer.id}"
