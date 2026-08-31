from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

ROLE_CHOICES = (
    ('student', 'Student'),
    ('alumni', 'Alumni'),
    ('admin', 'Admin'),
)
class CustomUser(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='student'
    )

    is_verified = models.BooleanField(default=False)


    phone = models.CharField(
        max_length=15,
        unique=True
    )

    email = models.EmailField(
    unique=True
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email