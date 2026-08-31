from rest_framework import serializers
from .models import StudentProfile, AlumniProfile


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = "__all__"
        read_only_fields = ["user"]


class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = "__all__"
        read_only_fields = ["user"]

class AlumniListSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    user_id = serializers.IntegerField(
        source="user.id",
        read_only=True
    )

    class Meta:

        model = AlumniProfile

        fields = (
            "user_id",
            "username",
            "full_name",
            "company_name",
            "job_title",
            "current_city",
        )