# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['yourusername.pythonanywhere.com', 'www.yourusername.pythonanywhere.com']

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://yourusername.pythonanywhere.com",
    "https://www.yourusername.pythonanywhere.com",
]

CORS_ALLOW_CREDENTIALS = True

# CSRF settings
CSRF_TRUSTED_ORIGINS = [
    "https://yourusername.pythonanywhere.com",
    "https://www.yourusername.pythonanywhere.com",
] 

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = '/home/mustaff2277/StreamVibe/static'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = '/home/mustaff2277/StreamVibe/media'

# ... existing code ...