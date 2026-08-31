from django.urls import path
from .views import StudentProfileView, AlumniProfileView, AlumniListView

urlpatterns = [
    path("student/", StudentProfileView.as_view(), name="student-profile"),
    path("alumni/", AlumniProfileView.as_view(), name="alumni-profile"),
    path("alumni-list/",AlumniListView.as_view(),name="alumni-list"),
]