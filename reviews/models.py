from django.db import models
from django.contrib.auth.models import User

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_title = models.CharField(max_length=255)
    movie_id = models.IntegerField(null=True, blank=True)
    movie_type = models.CharField(max_length=10, null=True, blank=True)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    review_content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'movie_title']
        ordering = ['-created_date']

    def __str__(self):
        return f"{self.user.username}'s review for {self.movie_title}"
