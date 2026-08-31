from datetime import date
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError

from .models import Event, EventRegistration
from .serializers import EventSerializer, EventRegistrationSerializer
from .permissions import IsAdminOrAlumni, IsEventOwnerOrAdmin
from notifications.models import Notification
from accounts.models import CustomUser

class EventListCreateView(generics.ListCreateAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):

        if self.request.method == "POST":
            return [IsAdminOrAlumni()]

        return [IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):

            event = serializer.save(
                created_by=self.request.user
            )

            # Notify all students and alumni
            users = CustomUser.objects.filter(
                role__in=["student", "alumni"]
            ).exclude(
                id=self.request.user.id
            )

            notifications = [
                Notification(
                    user=user,
                    title="New Event Added",
                    message=f"{event.title} has been added.",
                    link="/events"
                )
                for user in users
            ]

            Notification.objects.bulk_create(notifications)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):

        # GET → Everyone
        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [IsAuthenticatedOrReadOnly()]

        # PUT, PATCH, DELETE
        return [IsAuthenticated(), IsEventOwnerOrAdmin()]

class RegisterEventView(generics.CreateAPIView):

    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        event = Event.objects.get(pk=self.kwargs["pk"])

        # Already Registered
        if EventRegistration.objects.filter(
            event=event,
            user=self.request.user
        ).exists():

            raise ValidationError(
                "You have already registered for this event."
            )

        # Registration Deadline
        if date.today() > event.registration_deadline:

            raise ValidationError(
                "Registration deadline has expired."
            )

        # Event Capacity
        if event.registrations.count() >= event.capacity:

            raise ValidationError(
                "Event is full."
            )

        # Event Status
        if event.status != "Upcoming":

            raise ValidationError(
                "Registration is closed."
            )

        registration = serializer.save(
            event=event,
            user=self.request.user
        )

        Notification.objects.create(
            user=self.request.user,
            title="Event Registration Successful",
            message=f"You have successfully registered for {event.title}.",
            link="/events"
        )

class MyRegisteredEventsView(generics.ListAPIView):

    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return EventRegistration.objects.filter(
            user=self.request.user
        ).order_by("-registered_at")

class EventParticipantsView(generics.ListAPIView):

    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return EventRegistration.objects.filter(
            event_id=self.kwargs["pk"]
        ).order_by("-registered_at")


# Attendance Update API
class UpdateAttendanceView(generics.UpdateAPIView):

    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]