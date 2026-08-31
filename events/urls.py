from django.urls import path

from .views import (
    EventListCreateView,
    EventDetailView,
    RegisterEventView,
    MyRegisteredEventsView,
    EventParticipantsView,
    UpdateAttendanceView,
)

urlpatterns = [
    path("", EventListCreateView.as_view(), name="event-list"),
    path("<int:pk>/", EventDetailView.as_view(), name="event-detail"),
    path("<int:pk>/register/", RegisterEventView.as_view(), name="register-event"),
    path("my-events/", MyRegisteredEventsView.as_view(), name="my-events"),
    path("<int:pk>/participants/",EventParticipantsView.as_view(),name="event-participants"),
    path("registration/<int:pk>/attendance/",UpdateAttendanceView.as_view(),name="update-attendance"),
]