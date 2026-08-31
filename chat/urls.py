from django.urls import path
from .views import StartConversationView, SendMessageView, ConversationListView, ConversationDetailView, MarkMessageSeenView

urlpatterns = [
    path("start/",StartConversationView.as_view(),name="start-conversation"),
    path("<int:pk>/send/",SendMessageView.as_view(),name="send-message"),
    path("",ConversationListView.as_view(),name="conversation-list"),
    path("<int:pk>/",ConversationDetailView.as_view(),name="conversation-detail"),
    path("message/<int:pk>/seen/",MarkMessageSeenView.as_view(),name="message-seen"),
]