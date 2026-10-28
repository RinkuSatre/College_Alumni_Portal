from django.urls import path

from .views import (
    FeedbackListCreateView,
    AdminFeedbackListView,
    AdminFeedbackDetailView,
    ContactQueryCreateView,
    AdminContactQueryListView,
    AdminContactQueryDetailView,
)

urlpatterns = [
    path("", FeedbackListCreateView.as_view(), name="feedback-list-create"),
    path("admin/", AdminFeedbackListView.as_view(), name="admin-feedback-list"),
    path(
        "admin/<int:pk>/",
        AdminFeedbackDetailView.as_view(),
        name="admin-feedback-detail",
    ),
    # Public Contact Query API
    path(
        "contact/",
        ContactQueryCreateView.as_view(),
        name="contact-query-create",
    ),

    # Admin Contact Query APIs
    path(
        "contact/admin/",
        AdminContactQueryListView.as_view(),
        name="admin-contact-query-list",
    ),
    path(
        "contact/admin/<int:pk>/",
        AdminContactQueryDetailView.as_view(),
        name="admin-contact-query-detail",
    ),
]