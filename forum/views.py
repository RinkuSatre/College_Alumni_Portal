from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework import status
from .models import Question, Answer, AnswerLike
from .serializers import (
    QuestionSerializer,
    AnswerSerializer,
    AnswerLikeSerializer,
)

from .permissions import IsStudentOrAlumni, IsOwnerOrAdmin
from rewards.models import RewardPoint

from notifications.models import Notification

class QuestionListCreateView(generics.ListCreateAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_permissions(self):

        if self.request.method == "POST":
            return [IsStudentOrAlumni()]

        return [IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):

        question = serializer.save(
           user=self.request.user
        )

        RewardPoint.objects.create(
           user=self.request.user,
           points=2,
           reason="Asked Question"
        )


# Question APIs
class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
   
    def get_permissions(self):

        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [IsAuthenticatedOrReadOnly()]

        return [IsAuthenticated(), IsOwnerOrAdmin()]

# Answer API
class AnswerCreateView(generics.CreateAPIView):

    serializer_class = AnswerSerializer
    permission_classes = [IsStudentOrAlumni]

    def perform_create(self, serializer):

        question = Question.objects.get(
            pk=self.kwargs["pk"]
        )

        if question.user == self.request.user:

            raise ValidationError(
                  "You cannot answer your own question."
            )

        answer = serializer.save(
           user=self.request.user,
           question=question
        )


        Notification.objects.create(
            user=question.user,
            title="New Answer",
            message=f"{self.request.user.username} answered your question.",
            link="/forum"
        )

        RewardPoint.objects.create(
            user=self.request.user,
            points=5,
            reason="Posted Answer"
        )

# My Questions API
class MyQuestionsView(generics.ListAPIView):

    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Question.objects.filter(
            user=self.request.user
        )

# My Answers API
class MyAnswersView(generics.ListAPIView):

    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Answer.objects.filter(
            user=self.request.user
        )

class LikeAnswerView(generics.CreateAPIView):

    serializer_class = AnswerLikeSerializer
    permission_classes = [IsStudentOrAlumni]

    def perform_create(self, serializer):

        answer = Answer.objects.get(pk=self.kwargs["pk"])

        if answer.user == self.request.user:

            raise ValidationError(
                "You cannot like your own answer."
            )

        if AnswerLike.objects.filter(
            answer=answer,
            user=self.request.user
        ).exists():

            raise ValidationError(
                "You already liked this answer."
            )

        serializer.save(
            answer=answer,
            user=self.request.user
        )

        Notification.objects.create(
            user=answer.user,
            title="Answer Liked",
            message=f"{self.request.user.username} liked your answer.",
            link="/forum"
        )
        
        if not RewardPoint.objects.filter(
            user=answer.user,
            reason="Answer Liked"
        ).exists():

            RewardPoint.objects.create(
                user=answer.user,
                points=2,
                reason="Answer Liked"
            )
                
    


from rewards.models import RewardPoint

class AcceptAnswerView(generics.UpdateAPIView):

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):

        answer = self.get_object()

        # Only Question Owner or Admin can accept answer
        if (
            answer.question.user != self.request.user
            and not self.request.user.is_superuser
        ):
            raise ValidationError(
                "You are not allowed to accept this answer."
            )

        # Remove previous accepted answer
        Answer.objects.filter(
            question=answer.question,
            is_accepted=True
        ).update(is_accepted=False)

        serializer.save(is_accepted=True)

        Notification.objects.create(
            user=answer.user,
            title="Answer Accepted",
            message=f"Your answer to '{answer.question.title}' was accepted.",
            link="/forum"
        )

        if not RewardPoint.objects.filter(
            user=answer.user,
            reason="Accepted Answer"
        ).exists():

            RewardPoint.objects.create(
                user=answer.user,
                points=10,
                reason="Accepted Answer"
            )

        print("===== ACCEPT API CALLED =====")
        print(answer.user.username)


        if not RewardPoint.objects.filter(
            user=answer.user,
            reason="Accepted Answer"
        ).exists():

            RewardPoint.objects.create(
                user=answer.user,
                points=10,
                reason="Accepted Answer"
            )

class AnswerDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    
    def get_permissions(self):

        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [IsAuthenticatedOrReadOnly()]

        return [IsAuthenticated(), IsOwnerOrAdmin()]