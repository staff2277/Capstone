// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://streamvibe-backend-q0e9.onrender.com/api'
  : 'http://localhost:8000/api';

// TMDB Configuration
export const TMDB_API_KEY = '1a2db6584f1bb0b764f1bf445b503d83';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Other Configuration
export const SITE_URL = process.env.NODE_ENV === 'production'
  ? 'https://svibe.netlify.app'
  : 'http://localhost:5173'; 