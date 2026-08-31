"""
URL configuration for college_alumni_portal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from .views import home
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('login/', views.login_page, name='login'),
    path('register/', views.register_page, name='register'),
    path('api/accounts/', include('accounts.urls')),
    path("api/profiles/", include("profiles.urls")),
    path("api/jobs/", include("jobs.urls")),
    path("api/events/", include("events.urls")),
    path("api/forum/", include("forum.urls")),
    path("api/rewards/", include("rewards.urls")),
    path("api/chat/", include("chat.urls")),
    path("api/notifications/", include("notifications.urls")),
    path("api/reports/", include("reports.urls")),
    path("student-dashboard/",views.student_dashboard,name="student_dashboard"),
    path("alumni-dashboard/",views.alumni_dashboard,name="alumni_dashboard"),
    path("admin-dashboard/",views.admin_dashboard,name="admin_dashboard"),
    path("student-profile/", views.student_profile, name="student-profile"),
    path("alumni-profile/", views.alumni_profile, name="alumni-profile"),
    path("jobs/", views.jobs, name="jobs"),
    path("events/", views.events, name="events"),
    path("forum/", views.forum, name="forum"),
    path("notifications/", views.notifications, name="notifications"), 
    
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
