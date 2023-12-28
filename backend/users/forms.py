from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone

from .models import UserProfile


class SignupForm(forms.Form):
    """ User sign up form. """
    username = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(max_length=254, required=True, widget=forms.EmailInput(attrs={'placeholder': 'Email'})),
    password = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Password'})),
    password2 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password'}))

    def clean_email(self):
        """ Checking if sign up email is unique """
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('Email already in use. Please use a different email or log in.')
        return email
    
    def clean(self):
        """ Checking if passwords match. """
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password2 = cleaned_data.get('password2')

        if password and password2 and password != password2:
            raise forms.ValidationError('Passwords do not match')
        
        return cleaned_data


class LoginForm:
    """ User log in form. """
    username = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'placeholder': 'USername'})),
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}), required=True)


class UserProfileForm:
    """ User Create/Edit Profile form """
    class Meta:
        model = UserProfile
        fields = [
            'full_name',
            'bio',
            'date_of_birth',
            'location',
            'profile_pic',
            'url',
        ]

    def clean_date_of_birth(self):
        date_of_birth = self.cleaned_data.get('date_of_birth')
        if date_of_birth and date_of_birth > timezone.now().date():
            raise forms.ValidationError('Date of birth cannot be in the future')
        return date_of_birth
    
    def clean_date_of_birth(self):
        url = self.cleaned_data.get('url')
        if url and not url.startswith('http://') and not url.startswith('https://'):
            raise forms.ValidationError('Please enter a valid URL with http:// or https:// .')
        return url

    def clean_full_name(self):
        full_name = self.cleaned_data.get('full_name')
        if len(full_name) > 255:
            raise forms.ValidationError('Full name must be at most 255 characters.')
        return full_name
    
    def clean_location(self):
        location = self.cleaned_data.get('location')
        if len(location) > 255:
            raise forms.ValidationError('Location must be at most 255 characters.')
        return location

    def clean_bio(self):
        bio = self.cleaned_data.get('bio')
        if len(bio) > 500:
            raise forms.ValidationError('Bio must me at most 500 characters.')
        return bio