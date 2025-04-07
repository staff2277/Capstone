# Deploying StreamVibe to PythonAnywhere

This guide will walk you through deploying the StreamVibe application (Django backend + React frontend) to PythonAnywhere.

## Prerequisites

1. A PythonAnywhere account (free or paid)
2. Git installed on your local machine

## Step 1: Prepare Your Local Repository

1. Make sure all your changes are committed to Git
2. Update the Django settings to use your PythonAnywhere domain
3. Update the React API base URL to use your PythonAnywhere domain
4. Build the React application for production

```bash
# Navigate to the React project directory
cd StreamVibe

# Install dependencies
npm install

# Build the application
npm run build
```

## Step 2: Set Up PythonAnywhere

1. Log in to your PythonAnywhere account
2. Go to the "Web" tab
3. Create a new web app:
   - Choose "Manual configuration"
   - Select Python 3.10 or higher

## Step 3: Upload Your Code

1. Go to the "Files" tab in PythonAnywhere
2. Navigate to your web app directory (e.g., `/home/mustaff2277/mysite`)
3. Upload your project files or clone your Git repository

```bash
# In the PythonAnywhere bash console
cd /home/mustaff2277/mysite
git clone https://github.com/yourusername/streamvibe.git .
```

## Step 4: Set Up a Virtual Environment

1. Open a bash console in PythonAnywhere
2. Create and activate a virtual environment

```bash
cd /home/mustaff2277/mysite
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Step 5: Configure the Web App

1. Go to the "Web" tab
2. Under "Code" section, set:
   - Source code: `/home/mustaff2277/mysite`
   - Working directory: `/home/mustaff2277/mysite`
   - Virtualenv: `/home/mustaff2277/mysite/venv`

3. Under "WSGI configuration file", click on the link and replace the content with:

```python
import os
import sys

# Add your project directory to the sys.path
path = '/home/mustaff2277/mysite'
if path not in sys.path:
    sys.path.append(path)

# Set the Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

# Import Django's WSGI handler
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

## Step 6: Configure Static Files

1. In the "Web" tab, under "Static files" section, add:
   - URL: `/static/`
   - Directory: `/home/mustaff2277/mysite/static`

2. Add another entry for the React build:
   - URL: `/`
   - Directory: `/home/mustaff2277/mysite/StreamVibe/dist`

## Step 7: Set Up the Database

1. In the "Databases" tab, create a new database
2. Update your Django settings to use this database

```python
# In backend/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mustaff2277$streamvibe',
        'USER': 'mustaff2277',
        'PASSWORD': 'your-database-password',
        'HOST': 'mustaff2277.mysql.pythonanywhere-services.com',
    }
}
```

3. Run migrations

```bash
cd /home/mustaff2277/mysite
source venv/bin/activate
python manage.py migrate
```

## Step 8: Create a Superuser

```bash
cd /home/mustaff2277/mysite
source venv/bin/activate
python manage.py createsuperuser
```

## Step 9: Reload Your Web App

1. Go to the "Web" tab
2. Click the "Reload" button

## Step 10: Access Your Application

Your application should now be available at:
- Backend API: `https://mustaff2277.pythonanywhere.com/api/`
- Frontend: `https://mustaff2277.pythonanywhere.com/`

## Troubleshooting

- Check the error logs in the "Web" tab
- Make sure all paths in the WSGI file are correct
- Verify that the virtual environment is activated and all dependencies are installed
- Ensure that the database settings are correct
- Check that the static files are properly configured 