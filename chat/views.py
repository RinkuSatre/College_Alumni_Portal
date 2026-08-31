from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
from accounts.models import CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from notifications.models import Notification


class StartConversationView(generics.CreateAPIView):

    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        alumni_id = request.data.get("alumni")

        alumni = CustomUser.objects.get(id=alumni_id)

        conversation = Conversation.objects.filter(
            student=request.user,
            alumni=alumni
        ).first()

        if conversation:

            serializer = self.get_serializer(conversation)

            return Response(
                serializer.data,
                status=200
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        serializer.save(
            student=request.user,
            alumni=alumni
        )

        return Response(
            serializer.data,
            status=201
        )

    def perform_create(self, serializer):

        alumni = CustomUser.objects.get(
            id=self.request.data.get("alumni")
        )

        serializer.save(
            student=self.request.user,
            alumni=alumni
        )


class SendMessageView(generics.CreateAPIView):

    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        conversation = Conversation.objects.get(
            pk=self.kwargs["pk"]
        )

        # Only participants can send messages
        if self.request.user not in [
            conversation.student,
            conversation.alumni
        ]:
            raise ValidationError(
                "You are not part of this conversation."
            )

        message = serializer.save(
            conversation=conversation,
            sender=self.request.user
        )

        # Find receiver
        if self.request.user == conversation.student:
            receiver = conversation.alumni
        else:
            receiver = conversation.student

        # Create notification
        Notification.objects.create(
            user=receiver,
            title="New Message",
            message=f"{self.request.user.username} sent you a message.",
            link=f"/chat/{conversation.id}"

        )

        conversation.save()

from django.db.models import Q


class ConversationListView(generics.ListAPIView):

    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Conversation.objects.filter(
            Q(student=self.request.user) |
            Q(alumni=self.request.user)
        ).order_by("-updated_at")


class ConversationDetailView(generics.RetrieveAPIView):

    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Conversation.objects.filter(
            Q(student=self.request.user) |
            Q(alumni=self.request.user)
        )


class MarkMessageSeenView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        try:
            message = Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            return Response(
                {"detail": "Message not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if request.user not in [
            message.conversation.student,
            message.conversation.alumni
        ]:
            return Response(
                {"detail": "You are not allowed."},
                status=status.HTTP_403_FORBIDDEN
            )

        if message.sender == request.user:
            return Response(
                {"detail": "You cannot mark your own message as seen."},
                status=status.HTTP_400_BAD_REQUEST
            )

        message.is_seen = True
        message.save()

        return Response(
            {"message": "Seen updated successfully."},
            status=status.HTTP_200_OK
        )