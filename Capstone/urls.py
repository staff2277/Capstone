from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.views.decorators.csrf import csrf_exempt
from auth_app.views import register, login_view, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('reviews.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),  # For browsable API authentication
    path('api/auth/register/', csrf_exempt(register), name='register'),
    path('api/auth/login/', csrf_exempt(login_view), name='login'),
    path('api/auth/logout/', csrf_exempt(logout_view), name='logout'),
    # Catch-all pattern to serve React frontend
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

# Serve static files correctly during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
