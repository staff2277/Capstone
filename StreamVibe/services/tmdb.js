import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../src/config';

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching TMDB:', error.response?.data || error.message);
    throw new Error(error.response?.data?.status_message || 'Failed to search movies');
  }
};

export const getMovieDetails = async (id, type = 'movie') => {
  try {
    console.log(`Fetching ${type} details for ID: ${id}`);
    const endpoint = type === 'movie' ? `/movie/${id}` : `/tv/${id}`;
    const response = await tmdbApi.get(endpoint, {
      params: {
        append_to_response: 'credits,videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.response?.data || error.message);
    throw new Error(error.response?.data?.status_message || `Failed to fetch ${type} details`);
  }
};

export const getSimilarMovies = async (id, type = 'movie') => {
  try {
    console.log(`Fetching similar ${type}s for ID: ${id}`);
    const endpoint = type === 'movie' ? `/movie/${id}/similar` : `/tv/${id}/similar`;
    const response = await tmdbApi.get(endpoint, {
      params: {
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error.response?.data || error.message);
    throw new Error(error.response?.data?.status_message || `Failed to fetch similar ${type}s`);
  }
}; 