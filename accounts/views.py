from django.shortcuts import render
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated
from jobs.models import Job
from jobs.models import JobApplication
from events.models import Event
from forum.models import Question
from rewards.models import RewardPoint
from notifications.models import Notification
from django.db import models


from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import UserRegistrationSerializer,UserLoginSerializer
class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)

class AdminDashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        # Admin access
        if not (
            request.user.role == "admin"
            or request.user.is_staff
            or request.user.is_superuser
        ):
            return Response(
                {"detail": "Admin access required."},
                status=403
            )

        return Response({

            "total_students": CustomUser.objects.filter(
                role="student"
            ).count(),

            "total_alumni": CustomUser.objects.filter(
                role="alumni"
            ).count(),

            "total_jobs": Job.objects.count(),

            "total_events": Event.objects.count(),

            "total_questions": Question.objects.count(),

            "total_applications": JobApplication.objects.count(),

            "total_reward_points": RewardPoint.objects.aggregate(
                total=models.Sum("points")
            )["total"] or 0,

            "total_notifications": Notification.objects.filter(
                user=request.user
            ).count(),

        })