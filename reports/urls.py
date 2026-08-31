from django.urls import path
from .views import (
    DashboardReportView,  
    StudentReportView,
    AlumniReportView,
    JobReportView,
    JobApplicationReportView,
    EventReportView,
    EventRegistrationReportView,
    QuestionReportView,
    AnswerReportView,
    RewardPointReportView,
    NotificationReportView,
    ConversationReportView,
    MessageReportView,
    UserReportView,
    UserVerifyView
)

    

urlpatterns = [
    path(
        "dashboard/",
        DashboardReportView.as_view(),
        name="dashboard-report",
    ),

    path(
        "students/",
        StudentReportView.as_view(),
        name="student-report",
    ),

    path(
        "alumni/",
        AlumniReportView.as_view(),
        name="alumni-report"
    ),

    path(
        "jobs/",
        JobReportView.as_view(),
        name="job-report"
    ),

    path(
        "job-applications/",
        JobApplicationReportView.as_view(),
        name="job-application-report"
    ),

    path(
        "events/",
        EventReportView.as_view(),
        name="event-report"
    ),

    path(
        "event-registrations/",
        EventRegistrationReportView.as_view(),
        name="event-registration-report"
    ),

    path(
        "questions/",
        QuestionReportView.as_view(),
        name="question-report"
    ),

    path(
        "answers/",
        AnswerReportView.as_view(),
        name="answer-report"
    ),

    path(
        "rewards/",
        RewardPointReportView.as_view(),
        name="reward-point-report"
    ),

    path(
        "notifications/",
        NotificationReportView.as_view(),
        name="notification-report"
    ),

    path(
        "conversations/",
        ConversationReportView.as_view(),
        name="conversation-report"
    ),

    path(
        "messages/",
        MessageReportView.as_view(),
        name="message-report"
    ),

    path("users/",
     UserReportView.as_view()
    ),

    path(
        "users/<int:pk>/verify/",
        UserVerifyView.as_view(),
        name="user-verify"
    ),

]