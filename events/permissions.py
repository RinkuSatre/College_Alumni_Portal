from rest_framework.permissions import BasePermission


class IsAdminOrAlumni(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        return (
            request.user.is_superuser or
            request.user.role == "alumni"
        )

from rest_framework.permissions import BasePermission


class IsEventOwnerOrAdmin(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Admin can do everything
        if request.user.is_superuser:
            return True

        # Alumni can edit/delete only their own events
        return obj.created_by == request.user