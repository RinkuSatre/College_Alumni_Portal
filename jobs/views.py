from django.shortcuts import render
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError

from .models import Job, JobApplication
from .serializers import JobSerializer, JobApplicationSerializer
from .permissions import IsAlumniOrAdmin,  IsJobOwnerOrAdmin
from notifications.models import Notification
from accounts.models import CustomUser


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_permissions(self):

        if self.request.method == "POST":
            return [IsAlumniOrAdmin()]

        return [IsAuthenticatedOrReadOnly()]

    
    def perform_create(self, serializer):

        job = serializer.save(
            posted_by=self.request.user,
            is_active=True
        )

        students = CustomUser.objects.filter(
            role__iexact="student"
        )

        notifications = []

        for student in students:
            notifications.append(
                Notification(
                    user=student,
                    title="New Job Posted",
                    message=f"{job.title} job has been posted.",
                    link="/jobs"
                )
            )

        Notification.objects.bulk_create(notifications)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_permissions(self):

        # GET → Everyone
        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [IsAuthenticatedOrReadOnly()]

        # PUT, PATCH, DELETE → Owner or Admin only
        return [
            IsAuthenticated(),
            IsJobOwnerOrAdmin(),
        ]

class ApplyJobView(generics.CreateAPIView):

    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        job = Job.objects.get(pk=self.kwargs["pk"])
        if not job.is_active:
            raise ValidationError("This job is closed.")

        if job.last_date < timezone.localdate():
            raise ValidationError("The application deadline for this job has expired.")

        # Student एकाच job ला पुन्हा apply करू शकत नाही
        if JobApplication.objects.filter(
            job=job,
            student=self.request.user
        ).exists():

            raise ValidationError(
                "You have already applied for this job."
            )

        serializer.save(
            student=self.request.user,
            job=job
        )

class MyApplicationsView(generics.ListAPIView):

    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(
            student=self.request.user
        ).order_by("-applied_at")

class ApplicantsListView(generics.ListAPIView):

    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return JobApplication.objects.filter(
            job_id=self.kwargs["pk"]
        ).order_by("-applied_at")

class UpdateApplicationStatusView(generics.UpdateAPIView):

    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

class MyJobsView(generics.ListAPIView):

    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        print("Logged-in user:", user.email)
        print("Logged-in role:", user.role)

        my_jobs = Job.objects.filter(
            posted_by=user
        ).order_by("-id")

        print("My jobs count:", my_jobs.count())

        return my_jobs 