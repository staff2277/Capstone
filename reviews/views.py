from django.shortcuts import render
from rest_framework import viewsets, filters, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Review
from .serializers import ReviewSerializer, UserSerializer
from django.db.models import Avg

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow anyone to register
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['movie_title', 'review_content']
    ordering_fields = ['rating', 'created_date']
    ordering = ['-created_date']

    def get_queryset(self):
        queryset = Review.objects.all()
        movie_title = self.request.query_params.get('movie_title', None)
        rating = self.request.query_params.get('rating', None)
        
        if movie_title:
            queryset = queryset.filter(movie_title__icontains=movie_title)
        if rating:
            queryset = queryset.filter(rating=rating)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response(
                {"detail": "You do not have permission to edit this review."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response(
                {"detail": "You do not have permission to delete this review."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def movie_stats(self, request):
        movie_title = request.query_params.get('movie_title', None)
        if not movie_title:
            return Response(
                {"detail": "Movie title is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        reviews = Review.objects.filter(movie_title__iexact=movie_title)
        avg_rating = reviews.aggregate(Avg('rating'))['rating__avg']
        review_count = reviews.count()
        
        return Response({
            "movie_title": movie_title,
            "average_rating": round(avg_rating, 2) if avg_rating else None,
            "review_count": review_count
        })
