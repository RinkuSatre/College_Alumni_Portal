from django.contrib import admin
from .models import StudentProfile, AlumniProfile
# Register your models here.

admin.site.register(StudentProfile)
admin.site.register(AlumniProfile)