from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission

from .models import Feedback
from .serializers import FeedbackSerializer, AdminFeedbackSerializer


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
        serializer.save(user=self.request.user)


class AdminFeedbackListView(generics.ListAPIView):
    serializer_class = AdminFeedbackSerializer
    permission_classes = [IsAuthenticated, IsFeedbackAdmin]

    queryset = Feedback.objects.select_related("user").all()


class AdminFeedbackDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdminFeedbackSerializer
    permission_classes = [IsAuthenticated, IsFeedbackAdmin]

    queryset = Feedback.objects.select_related("user").all()