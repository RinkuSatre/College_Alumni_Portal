from rest_framework import serializers
from .models import Question, Answer, AnswerLike


class AnswerSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    question_title = serializers.CharField(
        source="question.title",
        read_only=True
    )

    class Meta:
        model = Answer
        fields = "__all__"

        read_only_fields = (
            "user",
            "question",
            "created_at",
        )


class QuestionSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    # 👇 Answers automatically include होतील
    answers = AnswerSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Question
        fields = "__all__"

        read_only_fields = (
            "user",
            "created_at",
            "updated_at",
        )


class AnswerLikeSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = AnswerLike
        fields = "__all__"

        read_only_fields = (
            "user",
            "answer",
            "liked_at",
        )