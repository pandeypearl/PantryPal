""" Module for users application urls. """
from django.urls import path
from .import views

urlpatterns = [
    path('home', views.home, name='home'),
    # User Authentication
    path('signup/', views.signup, name='signup'),
    path('login/', views.signup, name='login'),
    path('logout/', views.logout, name='logout'),
    # User Profile
    path('user_profile/<int:pk>/', views.user_profile, name='user_profile'),
    path('user_settings/', views.user_settings, name='user_settings'),
]