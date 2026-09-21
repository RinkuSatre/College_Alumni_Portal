from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import StudentProfile, AlumniProfile
from .serializers import StudentProfileSerializer, AlumniProfileSerializer, AlumniListSerializer
from accounts.models import CustomUser


class StudentProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    def get_object(self):
        profile, created = StudentProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                "full_name": "",
                "prn_number": f"PRN-{self.request.user.id}",
                "department": "",
                "course": "",
                "year": 1,
                "phone": self.request.user.phone,
                "address": "",
            },
        )
        return profile


class AlumniProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = AlumniProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        profile, created = AlumniProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                "full_name": "",
                "prn_number": f"PRN-{self.request.user.id}",
                "passout_year": 2026,
                "company_name": "",
                "job_title": "",
                "experience": 0,
                "current_city": "",
                "linkedin": "",
                "phone": self.request.user.phone,
                "bio": "",
            },
        )
        return profile

class AlumniListView(generics.ListAPIView):

    serializer_class = AlumniListSerializer
    permission_classes = [IsAuthenticated]

    queryset = AlumniProfile.objects.all().order_by("full_name")