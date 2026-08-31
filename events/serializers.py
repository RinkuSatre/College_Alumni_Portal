from rest_framework import serializers
from .models import Event, EventRegistration


class EventSerializer(serializers.ModelSerializer):

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    created_by_id = serializers.IntegerField(
        source="created_by.id",
        read_only=True
    )

    class Meta:
        model = Event
        fields = "__all__"

        read_only_fields = (
            "created_by",
            "created_at",
            "updated_at",
        )


class EventRegistrationSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    event_title = serializers.CharField(
        source="event.title",
        read_only=True
    )

    class Meta:
        model = EventRegistration
        fields = "__all__"

        read_only_fields = (
            "user",
            "event",
            "registered_at",
        )