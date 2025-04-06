from django.urls import path
from . import views

urlpatterns = [
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/verify/', views.verify_token, name='verify_token'),
    path('auth/user/', views.get_user, name='get_user'),
] 