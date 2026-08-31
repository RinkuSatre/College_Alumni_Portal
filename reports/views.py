from django.shortcuts import render
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework import generics
from accounts.models import CustomUser
from jobs.models import Job, JobApplication
from events.models import Event, EventRegistration
from forum.models import Question, Answer
from rewards.models import RewardPoint
from notifications.models import Notification
from chat.models import Conversation, Message

from .serializers import (
    DashboardReportSerializer,
    StudentReportSerializer,
    AlumniReportSerializer,
    JobReportSerializer,
    JobApplicationReportSerializer,
    EventReportSerializer,
    EventRegistrationReportSerializer,
    QuestionReportSerializer,
    AnswerReportSerializer,
    RewardPointReportSerializer,
    NotificationReportSerializer,
    ConversationReportSerializer,
    MessageReportSerializer,
    UserReportSerializer
   
)

class DashboardReportView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = {

            # Users
            "total_students": CustomUser.objects.filter(role="student").count(),
            "total_alumni": CustomUser.objects.filter(role="alumni").count(),
            "total_admins": CustomUser.objects.filter(role="admin").count(),

            # Jobs
            "total_jobs": Job.objects.count(),
            "active_jobs": Job.objects.filter(is_active=True).count(),
            "total_job_applications": JobApplication.objects.count(),

            # Events
            "total_events": Event.objects.count(),
            "upcoming_events": Event.objects.filter(status="Upcoming").count(),
            "total_event_registrations": EventRegistration.objects.count(),

            # Forum
            "total_questions": Question.objects.count(),
            "total_answers": Answer.objects.count(),

            # Rewards
            "total_reward_points":
                RewardPoint.objects.aggregate(
                    total=Sum("points")
                )["total"] or 0,

            # Notifications
            "total_notifications": Notification.objects.count(),

            # Chat
            "total_conversations": Conversation.objects.count(),
            "total_messages": Message.objects.count(),
        }

        serializer = DashboardReportSerializer(data)

        return Response(serializer.data)

class StudentReportView(generics.ListAPIView):

    serializer_class = StudentReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return CustomUser.objects.filter(
            role="student"
        ).order_by("-date_joined")

class AlumniReportView(generics.ListAPIView):

    serializer_class = AlumniReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return CustomUser.objects.filter(
            role="alumni"
        ).order_by("-date_joined")

class JobReportView(generics.ListAPIView):

    serializer_class = JobReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Job.objects.all().order_by("-id")

class JobApplicationReportView(generics.ListAPIView):

    serializer_class = JobApplicationReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return JobApplication.objects.all().order_by("-applied_at")

class EventReportView(generics.ListAPIView):

    serializer_class = EventReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Event.objects.all().order_by("event_date")

class EventRegistrationReportView(generics.ListAPIView):

    serializer_class = EventRegistrationReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return EventRegistration.objects.all().order_by(
            "-registered_at"
        )

class QuestionReportView(generics.ListAPIView):

    serializer_class = QuestionReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Question.objects.all().order_by("-created_at")

class AnswerReportView(generics.ListAPIView):

    serializer_class = AnswerReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Answer.objects.all().order_by("-created_at")

class RewardPointReportView(generics.ListAPIView):

    serializer_class = RewardPointReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return RewardPoint.objects.all().order_by(
            "-created_at"
        )

class NotificationReportView(generics.ListAPIView):

    serializer_class = NotificationReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Notification.objects.all().order_by(
            "-created_at"
        )

class ConversationReportView(generics.ListAPIView):

    serializer_class = ConversationReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Conversation.objects.all().order_by(
            "-updated_at"
        )


class MessageReportView(generics.ListAPIView):

    serializer_class = MessageReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Message.objects.all().order_by(
            "created_at"
        )

class UserReportView(generics.ListAPIView):

    serializer_class = UserReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.all().order_by("-date_joined")

class UserVerifyView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        # Only admin can verify/unverify users
        if not (
            request.user.role == "admin"
            or request.user.is_staff
            or request.user.is_superuser
        ):
            return Response(
                {"detail": "Admin access required."},
                status=403
            )

        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found."},
                status=404
            )

        # Toggle verification status
        user.is_verified = not user.is_verified
        user.save()

        return Response({
            "id": user.id,
            "username": user.username,
            "is_verified": user.is_verified,
            "message": (
                "User verified successfully."
                if user.is_verified
                else "User unverified successfully."
            )
        })