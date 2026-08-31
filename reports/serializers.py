from rest_framework import serializers
from accounts.models import CustomUser
from jobs.models import Job, JobApplication
from events.models import Event, EventRegistration
from forum.models import Question, Answer
from rewards.models import RewardPoint
from notifications.models import Notification
from chat.models import Conversation, Message


class DashboardReportSerializer(serializers.Serializer):

    total_students = serializers.IntegerField()
    total_alumni = serializers.IntegerField()
    total_admins = serializers.IntegerField()

    total_jobs = serializers.IntegerField()
    active_jobs = serializers.IntegerField()

    total_job_applications = serializers.IntegerField()

    total_events = serializers.IntegerField()
    upcoming_events = serializers.IntegerField()
    total_event_registrations = serializers.IntegerField()

    total_questions = serializers.IntegerField()
    total_answers = serializers.IntegerField()

    total_reward_points = serializers.IntegerField()

    total_notifications = serializers.IntegerField()

    total_conversations = serializers.IntegerField()
    total_messages = serializers.IntegerField()

class StudentReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "date_joined",
        ]

class AlumniReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "date_joined",
        ]

class JobReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job

        fields = [
            "id",
            "title",
            "company_name",
            "location",
            "salary",
            "experience",
            "job_type",
            "last_date",
            "is_active",
            "created_at",
        ]


class JobApplicationReportSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.username",
        read_only=True
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company_name",
        read_only=True
    )

    class Meta:

        model = JobApplication

        fields = [
            "id",
            "student_name",
            "job_title",
            "company_name",
            "status",
            "applied_at",
        ]

class EventReportSerializer(serializers.ModelSerializer):

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:

        model = Event

        fields = [
            "id",
            "title",
            "event_type",
            "event_date",
            "event_time",
            "venue",
            "capacity",
            "registration_deadline",
            "status",
            "created_by_name",
        ]


class EventRegistrationReportSerializer(serializers.ModelSerializer):

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

        fields = [
            "id",
            "user_name",
            "event_title",
            "attendance_status",
            "registered_at",
        ]

class QuestionReportSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = Question

        fields = [
            "id",
            "user_name",
            "title",
            "category",
            "created_at",
        ]

class AnswerReportSerializer(serializers.ModelSerializer):

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

        fields = [
            "id",
            "user_name",
            "question_title",
            "answer",
            "is_accepted",
            "created_at",
        ]

class RewardPointReportSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = RewardPoint

        fields = [
            "id",
            "user_name",
            "points",
            "reason",
            "created_at",
        ]

class NotificationReportSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = Notification

        fields = [
            "id",
            "user_name",
            "title",
            "message",
            "is_read",
            "created_at",
        ]

class ConversationReportSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.username",
        read_only=True
    )

    alumni_name = serializers.CharField(
        source="alumni.username",
        read_only=True
    )

    class Meta:

        model = Conversation

        fields = [
            "id",
            "student_name",
            "alumni_name",
            "created_at",
            "updated_at",
        ]

class MessageReportSerializer(serializers.ModelSerializer):

    sender_name = serializers.CharField(
        source="sender.username",
        read_only=True
    )

    conversation_id = serializers.IntegerField(
        source="conversation.id",
        read_only=True
    )

    class Meta:

        model = Message

        fields = [
            "id",
            "conversation_id",
            "sender_name",
            "message",
            "is_seen",
            "created_at",
        ]

class UserReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "role",
            "is_verified",
            "date_joined",
        ]