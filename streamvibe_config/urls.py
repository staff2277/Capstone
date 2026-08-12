from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('reviews.urls')),
    path('api/', include('auth_app.urls')),  # Include all auth endpoints
    path('api-auth/', include('rest_framework.urls')),  # For browsable API authentication
    # Catch-all pattern to serve React frontend
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

# Serve static files correctly during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
