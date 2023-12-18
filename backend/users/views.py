from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .forms import SignupForm

# Create your views here.
def signup(request):
    """ User sign up view """
    form = SignupForm()

    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            password2 = form.cleaned_data['password2']

            if password != password2:
                return JsonResponse({'error': 'Passwords do not match.'})

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already taken'})
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username unavailable'})
            
            user = User.objects.create_user(username=username, email=email, password=password)
            user_login = authenticate(request, username=username, password=password)
            login(request, user_login)

            # Code for creating profile object will go here

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Form validation failed. Please try again.'})
    else:
        form = SignupForm()

    return redirect('base.html')