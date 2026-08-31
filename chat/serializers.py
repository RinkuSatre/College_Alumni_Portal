from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):

    sender_name = serializers.CharField(
        source="sender.username",
        read_only=True
    )

    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = (
            "sender",
            "conversation",
            "created_at",
        )


class ConversationSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.username",
        read_only=True
    )

    alumni_name = serializers.CharField(
        source="alumni.username",
        read_only=True
    )

    messages = MessageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Conversation
        fields = "__all__"
        read_only_fields = (
            "student",
            "alumni",
            "created_at",
            "updated_at",
        )