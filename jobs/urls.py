from django.urls import path
from .views import JobListCreateView, JobDetailView, ApplyJobView,MyApplicationsView, ApplicantsListView, UpdateApplicationStatusView


urlpatterns = [
    path("", JobListCreateView.as_view(), name="job-list"),
    path("<int:pk>/", JobDetailView.as_view(), name="job-detail"),
    path("<int:pk>/apply/", ApplyJobView.as_view(), name="apply-job"),
    path("my-applications/", MyApplicationsView.as_view(), name="my-applications"),
    path("<int:pk>/applicants/", ApplicantsListView.as_view(), name="applicants"),
    path("application/<int:pk>/update/",UpdateApplicationStatusView.as_view(),name="update-application"
),
]