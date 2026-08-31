from rest_framework.permissions import BasePermission


class IsAlumniOrAdmin(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        return (
            request.user.role == "alumni"
            or request.user.is_superuser
        )

class IsJobOwnerOrAdmin(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Admin
        if request.user.is_superuser:
            return True

        # Job Owner
        return obj.posted_by == request.user