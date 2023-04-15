from django.urls import path
from .views import UserRegistrationView, UserLoginView, LogoutAPIView


urlpatterns = [
    path('createCompte', UserRegistrationView.as_view(), name="register"),
    path('login', UserLoginView.as_view(), name="login"),
    # path('logout', LogoutAPIView.as_view(), name="logout"),
]
