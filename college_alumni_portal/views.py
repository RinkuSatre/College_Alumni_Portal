from django.shortcuts import render

def home(request):
    return render(request, "home.html")

def login_page(request):
    return render(request, "login.html")

def register_page(request):
    return render(request, "register.html")

def student_dashboard(request):
    return render(request, "student_dashboard.html")

def alumni_dashboard(request):
    return render(request, "alumni_dashboard.html")

def admin_dashboard(request):
    return render(request, "admin_dashboard.html")

def student_profile(request):
    return render(request, "student_profile.html")

def alumni_profile(request):
    return render(request, "alumni_profile.html")

def jobs(request):
    return render(request, "jobs.html")

def events(request):
    return render(request, "events.html")

def forum(request):
    return render(request, "forum.html")

def notifications(request):
    return render(request, "notifications.html")