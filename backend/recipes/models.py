from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class Cookbook(models.Model):
    ''' Defines cookbook model where user can store recipes. '''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    recipes = models.ManyToManyField(Recipe, related_name='cookbooks')

    def __str__(self):
        return f"{self.user.username}'s Cookbook: {self.title}"
    

class Recipe(models.Model):
    ''' Defines the recipe model '''
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.FileField(upload_to='recipe_image/')
    cookbooks = models.ManyToManyField(Cookbook, related_name='recipes', blank=True)

    def __str__(self):
        self.title


class Ingredient(models.Model):
    ''' Define the ingredient item model to add to recipe. '''
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    name = models.CharField(max_length=22)
    description = models.TextField()

    def __str__(self):
        self.name


class RecipeStep(models.Model):
    ''' Defines the recipe step model to add to the recipe. '''
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    order = models.IntegerField()
    description = models.TextField()
    time_minutes = models.IntegerField()

    def __str__(self):
        return f"Step {self.order} - {self.description}"
    

class RecipeReview(models.Model):
    ''' Defines the recipe review model. '''
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    tips = models.TextField()
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} = {self.recipe.title} Review"


class RecipeReviewVote(models.Model):
    ''' Defines the upvote/downvote recipe review model. '''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(RecipeReview, on_delete=models.CASCADE)
    VOTE_TYPES = [('upvote', 'Upvote'), ('downvote', 'Downvote')]
    vote_type = models.CharField(max_length=8, choices=VOTE_TYPES)

    def __str__(self):
        return f"{self.user.username} - {self.vote_type} for {self.review}"


class UserRecipeInteraction(models.Model):
    ''' Defines users interaction with a recipe model. '''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    saved = models.BooleanField(default=False)
    liked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.recipe.title} Interaction"
    

