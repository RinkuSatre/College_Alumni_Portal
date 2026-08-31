from rest_framework import serializers
from .models import RewardPoint


class RewardPointSerializer(serializers.ModelSerializer):

    class Meta:
        model = RewardPoint
        fields = "__all__"
        read_only_fields = (
            "user",
            "created_at",
        )