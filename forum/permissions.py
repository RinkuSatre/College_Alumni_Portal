from rest_framework.permissions import BasePermission


class IsStudentOrAlumni(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        return request.user.role in ["student", "alumni"] or request.user. is_superuser

class IsOwnerOrAdmin(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Admin can do everything
        if request.user.is_superuser:
            return True

        # Question owner
        if hasattr(obj, "user"):
            return obj.user == request.user

        return False