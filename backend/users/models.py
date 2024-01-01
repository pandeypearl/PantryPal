from django.db import models
from django.contrib.auth.models import User
from recipes.models import Recipe

# Create your models here.
class UserProfile(models.Model):
    ''' Defines user profile model '''
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(max_length=500, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=255,null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics', default='')
    url = models.URLField(max_length=200, blank=True, null=True)

    def follower_count(self):
        return self.user.followers.count()
    
    def following_count(self):
        return self.user.following.count()
    
    def __str__(self):
        return self.user.username
    

class Follow(models.Model):
    ''' Defines the follow model '''
    follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    followed = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.follower.username} follows {self.followed.username}'
    

