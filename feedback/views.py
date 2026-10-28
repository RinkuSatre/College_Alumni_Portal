from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated,
    BasePermission,  
    AllowAny,
)

from .models import Feedback,  ContactQuery
from .serializers import (
    
    FeedbackSerializer, 
    AdminFeedbackSerializer, 
    ContactQuerySerializer,  
    AdminContactQuerySerializer,
)

from django.contrib.auth import get_user_model
from django.db.models import Q
from notifications.models import Notification

User = get_user_model()


def is_feedback_admin(user):
    return (
        user.is_authenticated
        and (
            user.is_staff
            or user.is_superuser
            or getattr(user, "role", "") == "admin"
        )
    )


class IsFeedbackAdmin(BasePermission):
    def has_permission(self, request, view):
        return is_feedback_admin(request.user)


class FeedbackListCreateView(generics.ListCreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if is_feedback_admin(user):
            return Feedback.objects.select_related("user").all()

        return Feedback.objects.filter(
            user=user
        ).select_related("user")

    def perform_create(self, serializer):
        feedback = serializer.save(user=self.request.user)

        admin_users = User.objects.filter(
            Q(is_staff=True) |
            Q(is_superuser=True) |
            Q(role="admin")
        ).distinct()

        for admin in admin_users:
            Notification.objects.create(
                user=admin,
                title="New Feedback Received",
                message=(
                    f"{self.request.user.username} has submitted "
                    f"new feedback."
                ),
                link="/admin/feedback/"
            )

class AdminFeedbackListView(generics.ListAPIView):
    serializer_class = AdminFeedbackSerializer
    permission_classes = [IsAuthenticated, IsFeedbackAdmin]

    queryset = Feedback.objects.select_related("user").all()


class AdminFeedbackDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdminFeedbackSerializer
    permission_classes = [IsAuthenticated, IsFeedbackAdmin]

    queryset = Feedback.objects.select_related("user").all()


# Public Contact Query Submission
class ContactQueryCreateView(generics.CreateAPIView):
    queryset = ContactQuery.objects.all()
    serializer_class = ContactQuerySerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        contact_query = serializer.save()

        admin_users = User.objects.filter(
            Q(is_staff=True) |
            Q(is_superuser=True) |
            Q(role="admin")
        ).distinct()

        for admin in admin_users:
            Notification.objects.create(
                user=admin,
                title="New Contact Query",
                message=(
                    f"New contact query received from "
                    f"{contact_query.name} - "
                    f"{contact_query.subject}"
                ),
                link="/admin/contact-queries/"
            )


# Admin: View All Contact Queries
class AdminContactQueryListView(generics.ListAPIView):
    queryset = ContactQuery.objects.all()
    serializer_class = ContactQuerySerializer
    permission_classes = [IsAuthenticated, IsFeedbackAdmin]


# Admin: View, Update Status, or Delete a Query
class AdminContactQueryDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = ContactQuery.objects.all()
    serializer_class = AdminContactQuerySerializer
    permission_classes = [IsAuthenticated, IsFeedbackAdmin]
