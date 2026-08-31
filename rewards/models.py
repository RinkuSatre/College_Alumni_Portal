from django.db import models
from accounts.models import CustomUser


class RewardPoint(models.Model):

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="reward_points"
    )

    points = models.IntegerField()

    reason = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.points} Points"
