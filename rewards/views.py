from django.shortcuts import render
from django.db.models import Sum
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import RewardPoint
from .serializers import RewardPointSerializer


class MyRewardsView(generics.ListAPIView):

    serializer_class = RewardPointSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RewardPoint.objects.filter(
            user=self.request.user
        )


class TotalPointsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        total = RewardPoint.objects.filter(
            user=request.user
        ).aggregate(
            total_points=Sum("points")
        )

        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "role": request.user.role,
            "total_points": total["total_points"] or 0
        })
