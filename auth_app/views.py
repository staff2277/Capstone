from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        logger.info(f"Registration attempt for username: {username}, email: {email}")

        if not all([username, email, password]):
            logger.warning("Registration failed: Missing required fields")
            return Response(
                {'error': 'Please provide all required fields'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            logger.warning(f"Registration failed: Username {username} already exists")
            return Response(
                {'error': 'Username already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            logger.warning(f"Registration failed: Email {email} already exists")
            return Response(
                {'error': 'Email already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        token, _ = Token.objects.get_or_create(user=user)
        logger.info(f"User {username} registered successfully")
        
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return Response(
            {'error': 'An error occurred during registration'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login_view(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        logger.info(f"Login attempt for email: {email}")

        if not all([email, password]):
            logger.warning("Login failed: Missing email or password")
            return Response(
                {'error': 'Please provide both email and password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            logger.warning(f"Login failed: User with email {email} not found")
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = authenticate(username=user.username, password=password)
        if user is None:
            logger.warning(f"Login failed: Invalid password for user {email}")
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            logger.warning(f"Login failed: Inactive user {email}")
            return Response(
                {'error': 'Account is inactive'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)
        logger.info(f"User {user.username} logged in successfully")
        
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return Response(
            {'error': 'An error occurred during login'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def logout_view(request):
    try:
        request.user.auth_token.delete()
        logout(request)
        logger.info(f"User {request.user.username} logged out successfully")
        return Response({'message': 'Successfully logged out'})
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return Response(
            {'error': 'An error occurred during logout'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    try:
        return Response({'valid': True})
    except Exception as e:
        logger.error(f"Token verification error: {str(e)}")
        return Response(
            {'error': 'Token verification failed'},
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    try:
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        })
    except Exception as e:
        logger.error(f"Get user error: {str(e)}")
        return Response(
            {'error': 'Failed to get user data'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        ) 