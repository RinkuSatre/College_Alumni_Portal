from django.urls import path
from .views import NotificationListView, MarkAllReadView, MarkNotificationReadView

urlpatterns = [
    path(
        "",
        NotificationListView.as_view(),
        name="notification-list",
    ),

    path(
        "read-all/",
        MarkAllReadView.as_view(),
        name="read-all",
    ),

    path(
        "<int:pk>/read/",
        MarkNotificationReadView.as_view(),
        name="notification-read",
    ),
]
