#!/usr/bin/env bash

# Use pip instead of Poetry
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput
