from django.urls import path
from .views import UserRegistrationView,UserLoginView, AdminDashboardStatsView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),

    path(
        "login/",
        UserLoginView.as_view(),
        name="login"
    ),

    path(
    "admin-dashboard-stats/",
    AdminDashboardStatsView.as_view(),
    name="admin-dashboard-stats"
    ),

]