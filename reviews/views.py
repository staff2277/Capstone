from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, filters, status, generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Review
from .serializers import ReviewSerializer, UserSerializer
from django.db.models import Avg, Count

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
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        movie_id = self.request.query_params.get('movie_id')
        movie_type = self.request.query_params.get('movie_type')
        if movie_id and movie_type:
            return Review.objects.filter(movie_id=movie_id, movie_type=movie_type)
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Check if user has reached the review limit for this movie
        movie_id = self.request.data.get('movie_id')
        movie_type = self.request.data.get('movie_type')
        
        if movie_id and movie_type:
            review_count = Review.objects.filter(
                user=self.request.user,
                movie_id=movie_id,
                movie_type=movie_type
            ).count()
            
            if review_count >= 10:
                raise serializers.ValidationError(
                    {"detail": "You have reached the maximum limit of 10 reviews for this movie."}
                )
        
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

    @action(detail=False, methods=['get'])
    def my_reviews(self, request):
        reviews = Review.objects.filter(user=request.user)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def movie_reviews(self, request):
        movie_id = request.query_params.get('movie_id')
        movie_type = request.query_params.get('movie_type')
        if not movie_id or not movie_type:
            return Response(
                {'error': 'movie_id and movie_type are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        reviews = Review.objects.filter(movie_id=movie_id, movie_type=movie_type)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)
