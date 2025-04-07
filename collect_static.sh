#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Collect static files
python manage.py collectstatic --noinput

# Build React application
cd StreamVibe
npm install
npm run build

echo "Static files collected and React app built successfully!" 