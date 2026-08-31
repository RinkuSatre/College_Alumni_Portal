from django.urls import path
from .views import MyRewardsView, TotalPointsView

urlpatterns = [
    path(
        "",
        MyRewardsView.as_view(),
        name="my-rewards",
    ),

    path(
        "total/",
        TotalPointsView.as_view(),
        name="total-points",
    ),
]