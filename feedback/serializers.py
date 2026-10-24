from rest_framework import serializers
from .models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Feedback
        fields = [
            "id",
            "username",
            "category",
            "rating",
            "message",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "username",
            "status",
            "created_at",
        ]

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )
        return value


class AdminFeedbackSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Feedback
        fields = "__all__"
        read_only_fields = [
            "id",
            "user",
            "category",
            "rating",
            "message",
            "created_at",
        ]