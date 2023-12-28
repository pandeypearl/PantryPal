from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth

from .forms import SignupForm, LoginForm, UserProfileForm
from .models import UserProfile, Follow 

# Create your views here.

def home(request):
    return render(request, 'base.html')

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
            user_model = User.objects.get(username=username)

            new_user_profile = UserProfile.objects.create(user=user_model)
            new_user_profile.save()

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Form validation failed. Please try again.'})
    else:
        form = SignupForm()

    return JsonResponse({'error': 'Invalid request method.'})


def login(request):
    """ User log in view. """
    form = LoginForm()

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = auth.authenticate(request, username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return JsonResponse({'success': True, 'message': 'Login successful.'})
            else:
                return JsonResponse({'error': 'Invalid username or password'})
        else:
            return JsonResponse({'error': 'Form validation failed. Please try again.', 'form_errors': form.errors})
    else:
        return JsonResponse({'error': 'Invalid request method.'})


@login_required(login_url='login')
def logout(request):
    """ User log out view. """
    if request.method == 'POST':
        request.user.auth_token.delete()  # Optional: if you're using Token-based authentication
        auth.logout(request)
        return JsonResponse({'success': True, 'message': 'Logout successful.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'})


@login_required(login_url='login')
def user_profile(request, pk):
    ''' User profile view. '''

    user_object = get_object_or_404(User, pk=pk)
    user_profile = UserProfile.objects.get(user=user_object)

    followers = user_object.followers.all()
    following = user_object.following.all()
    is_following = Follow.objects.filter(follower=request.user, followed=user_object).exists()
    follower_count = user_object.followers.count()
    following_count = user_object.following.count()

    context = {
        'user_object': user_object,
        'user_profile': user_profile,
        'followers': followers,
        'following': following,
        'is_following': is_following,
        'follower_count': follower_count,
        'following_count': following_count,
    }

    return JsonResponse(context)


@login_required(login_url='login')
def user_settings(request):
    ''' User settings view to edit profile info. '''

    user = request.user
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    form = UserProfileForm(instance=user_profile)

    context = {
        'user': user,
        'user_profile': user_profile,
        'created': created,
        'form': form,
    }

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
        if form.is_valid():
            form.save()
            context.update({
                'success': True,
                'message': 'Profile updated successfully.',
            })
        else:
            return context.update({'error':  'Form validation failed. Please try again.'})
        return JsonResponse(context)

    return JsonResponse(context)


@login_required(login_url='login')
def follow(request, pk):
    ''' Follow another user view. '''
    if request.method == 'POST':
        user_to_follow = get_object_or_404(User, pk=pk).userprofile.user

        # Making sure user not trying to follow their own profile
        if request.user == user_to_follow:
            return JsonResponse({'error': 'Cannot follow your own profile.'})
        # Making sure user not  trying to follow a page they are already following
        if not Follow.objects.filter(follower=request.user, followed=user_to_follow).exists():
            Follow.objects.create(follower=request.user, followed=user_to_follow)
            return JsonResponse({'success': True, 'message': 'User followed successfully.'})
        else:
            return JsonResponse({'error': 'User is already being followed.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'})


@login_required(login_url='login')
def unfollow(request, pk):
    ''' Unfollow another user view. '''
    if request.method == 'POST':
        user_to_unfollow = get_object_or_404(User, pk=pk).userprofile.user

        # Making sure user is a follower before unfollowing
        follow_instance = Follow.objects.filter(follower=request.user, followed=user_to_unfollow).first()
        if follow_instance:
            follow_instance.delete()
            return JsonResponse({'success': True, 'message': 'User unfollowed successfully.'})
        else:
            return JsonResponse({'error': 'User is not being followed.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'})



@login_required(login_url='login')
def user_followers(request, pk):
    ''' User followers list view. '''
    user = get_object_or_404(User, pk=pk)
    followers = user.followers.all()

    context = {
        'user': user,
        'followers': followers,
    }

    return JsonResponse(context)


@login_required(login_url='login')
def user_following(request, pk):
    ''' User following list view. '''
    user = get_object_or_404(User, pk=pk)
    followers = user.following.all()

    context = {
        'user': user,
        'followers': followers,
    }

    return JsonResponse(context)