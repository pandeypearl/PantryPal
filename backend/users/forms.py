from django import forms
from django.contrib.auth.models import User


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