from django.db import models
from accounts.models import CustomUser

# Create your models here.
class StudentProfile(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='student_profile'
    )

    full_name = models.CharField(max_length=100)
    prn_number = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    course = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    profile_photo = models.ImageField(
        upload_to='student_profiles/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.full_name

class AlumniProfile(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='alumni_profile'
    )

    full_name = models.CharField(max_length=100)
    prn_number = models.CharField(
        max_length=20,
        unique=True
    )
    passout_year = models.PositiveIntegerField()
    company_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    experience = models.PositiveIntegerField()
    current_city = models.CharField(max_length=100)
    linkedin = models.URLField(blank=True, null=True)
    phone = models.CharField(max_length=15)
    bio = models.TextField(blank=True, null=True)
    profile_photo = models.ImageField(
        upload_to='alumni_profiles/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.full_name