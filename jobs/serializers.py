from rest_framework import serializers
from .models import Job, JobApplication


class JobSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.CharField(
        source="posted_by.username",
        read_only=True
    )

    posted_by_id = serializers.IntegerField(
        source="posted_by.id",
        read_only=True
    )

    class Meta:
        model = Job
        fields = "__all__"
        read_only_fields = (
            "posted_by",
            "created_at",
            "updated_at",
        )


class JobApplicationSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.username",
        read_only=True
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    class Meta:
        model = JobApplication
        fields = "__all__"
        read_only_fields = (
            "student",
            "job", 
            "applied_at",
        )