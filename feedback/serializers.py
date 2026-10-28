from rest_framework import serializers
from .models import Feedback,ContactQuery


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

class ContactQuerySerializer(serializers.ModelSerializer):

    class Meta:
        model = ContactQuery
        fields = [
            "id",
            "name",
            "phone",
            "email",
            "subject",
            "message",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]

    def validate_phone(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Name is required."
            )

        return value.strip()

    def validate_subject(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Subject is required."
            )

        return value.strip()

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Query message is required."
            )

        return value.strip()


class AdminContactQuerySerializer(serializers.ModelSerializer):

    class Meta:
        model = ContactQuery
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
        ]
