from django.db import models
from accounts.models import CustomUser


JOB_TYPE_CHOICES = (
    ("Full Time", "Full Time"),
    ("Part Time", "Part Time"),
    ("Internship", "Internship"),
    ("Remote", "Remote"),
)


class Job(models.Model):
    posted_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)

    salary = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    experience = models.PositiveIntegerField(default=0)

    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPE_CHOICES
    )

    last_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]   

    def __str__(self):
        return f"{self.title} - {self.company_name}"

APPLICATION_STATUS = (
    ("Pending", "Pending"),
    ("Shortlisted", "Shortlisted"),
    ("Rejected", "Rejected"),
    ("Selected", "Selected"),
)

class JobApplication(models.Model):

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    student = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="job_applications"
    )

    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=APPLICATION_STATUS,
        default="Pending"
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} -> {self.job.title}"