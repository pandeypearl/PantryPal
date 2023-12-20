""" Module for users application urls. """
from django.urls import path
from .import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.signup, name='login'),
    path('logout/', views.logout, name='logout'),
]