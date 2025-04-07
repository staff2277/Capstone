# StreamVibe - Movie Review Platform

A full-stack application for reviewing movies, built with Django and React.

## Features

- User authentication (login, register, logout)
- Movie browsing and searching
- Movie reviews with ratings
- User profile management

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL (in production)
- SQLite (in development)

### Frontend
- React
- Tailwind CSS
- Framer Motion

## Local Development

### Backend Setup

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```
   python manage.py migrate
   ```
5. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the StreamVibe directory:
   ```
   cd StreamVibe
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Deployment on Render

### Backend Deployment

1. Create a Render account at [render.com](https://render.com)
2. Connect your GitHub repository to Render
3. Create a new Web Service
4. Select your repository
5. Configure the service:
   - Name: `streamvibe-backend`
   - Environment: `Python`
   - Build Command: `./build.sh`
   - Start Command: `gunicorn Capstone.wsgi:application`
6. Add environment variables:
   - `DJANGO_DEBUG`: `False`
   - `DJANGO_SECRET_KEY`: (Generate a secure key)
   - `DJANGO_ALLOWED_HOSTS`: `.onrender.com`
   - `CORS_ALLOWED_ORIGINS`: `https://streamvibe-frontend.onrender.com`
   - `CSRF_TRUSTED_ORIGINS`: `https://streamvibe-frontend.onrender.com`
7. Deploy the service

### Frontend Deployment

1. Create a new Static Site in Render
2. Connect your GitHub repository
3. Configure the build:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add environment variables:
   - `VITE_API_URL`: `https://streamvibe-backend.onrender.com/api`
5. Deploy the site

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register/`: Register a new user
- `POST /api/auth/login/`: Login a user
- `POST /api/auth/logout/`: Logout a user
- `GET /api/auth/user/`: Get current user information

### Review Endpoints

- `GET /api/reviews/movie_reviews/`: Get reviews for a specific movie
- `POST /api/reviews/`: Create a new review
- `PUT /api/reviews/{id}/`: Update a review
- `DELETE /api/reviews/{id}/`: Delete a review
- `GET /api/reviews/my_reviews/`: Get current user's reviews

## License

This project is licensed under the MIT License.

## Contact

For inquiries, reach out to [Your Name] at [your email].

mustaff2277\@gmail.com
