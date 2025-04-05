from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

class Review(models.Model):
    movie_title = models.CharField(max_length=255)
    review_content = models.TextField()
    rating = models.IntegerField(
        validators=[
            MinValueValidator(1, message="Rating must be at least 1"),
            MaxValueValidator(5, message="Rating cannot exceed 5")
        ]
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']
        # Ensure a user can only review a movie once
        unique_together = ['user', 'movie_title']

    def __str__(self):
        return f"{self.movie_title} - {self.rating}/5 by {self.user.username}"
