from django.urls import path

from .views import (
    QuestionListCreateView,
    QuestionDetailView,
    AnswerCreateView,
    MyQuestionsView,
    MyAnswersView,
    LikeAnswerView,
    AcceptAnswerView,
    AnswerDetailView,
)

urlpatterns = [

    # Questions
    path("", QuestionListCreateView.as_view(), name="question-list"),
    path("<int:pk>/", QuestionDetailView.as_view(), name="question-detail"),

    # Answers
    path("<int:pk>/answer/", AnswerCreateView.as_view(), name="answer-create"),

    # My Data
    path("my-questions/", MyQuestionsView.as_view(), name="my-questions"),
    path("my-answers/", MyAnswersView.as_view(), name="my-answers"),
    path("answer/<int:pk>/like/",LikeAnswerView.as_view(),name="like-answer"),
    path("answer/<int:pk>/accept/",AcceptAnswerView.as_view(),name="accept-answer"),
    path("answer/<int:pk>/",AnswerDetailView.as_view(),name="answer-detail"),
]