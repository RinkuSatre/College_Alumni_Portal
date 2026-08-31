from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'email',
            'password',
            'phone',
            'role',
             
        ]

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()


        return user

       

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            email=email,
            password=password
        )
        print(user)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        refresh = RefreshToken.for_user(user)

        role = user.role

        if user.is_superuser:
            role = "admin"

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": role,
        }