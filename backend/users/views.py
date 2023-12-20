from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from .forms import SignupForm, LoginForm

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


def login(request):
    """ User log in view. """
    template = 'base.html'

    form = LoginForm()

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = auth.authenticate(request, username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return redirect('base.html')
            else:
                form.add_error(None, 'Invalid username or password. Please use the correct credentials and try again.')
    else:
        form= LoginForm()

    context = {
        'form': form,
    }

    return render(request, template, context)


@login_required(login_url='login')
def logout(request):
    """ User log out view. """
    auth.logout(request)
    return redirect('login')
