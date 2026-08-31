from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class NotificationListView(generics.ListAPIView):

    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Notification.objects.filter(
            user=self.request.user
        )

class MarkAllReadView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request):

        Notification.objects.filter(
            user=request.user,
            is_read=False
        ).update(is_read=True)

        return Response({
            "message": "All notifications marked as read."
        })

class MarkNotificationReadView(generics.UpdateAPIView):

    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(
            user=self.request.user
        )

    def perform_update(self, serializer):
        serializer.save(is_read=True)
