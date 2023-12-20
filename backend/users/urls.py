""" Module for users application urls. """
from django.urls import path
from .import views

urlpatterns = [
    path('home', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.signup, name='login'),
    path('logout/', views.logout, name='logout'),
]