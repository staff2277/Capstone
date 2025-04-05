import { motion, AnimatePresence } from 'framer-motion';
import { getMovieDetails } from '../services/tmdb';
import { useState, useEffect } from 'react';

const MovieDetailsModal = ({ isOpen, onClose, movieId, type = 'movie' }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;
      
      setLoading(true);
      setError(null);
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1A1A1A] w-full max-w-4xl rounded-xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-8">{error}</div>
          ) : movieDetails ? (
            <div className="relative">
              {/* Backdrop Image */}
              <div className="relative h-96">
                <img
                  src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                  alt={movieDetails.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
              </div>

              {/* Movie Info */}
              <div className="p-6">
                <div className="flex gap-6">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    className="w-48 h-72 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{movieDetails.title}</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-yellow-400">
                        {movieDetails.vote_average.toFixed(1)}/10
                      </span>
                      <span>{new Date(movieDetails.release_date).getFullYear()}</span>
                      <span>{movieDetails.runtime} min</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {movieDetails.genres.map(genre => (
                        <span
                          key={genre.id}
                          className="bg-[#2b2a2a] px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">{movieDetails.overview}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Director</h3>
                        <p>
                          {movieDetails.credits.crew
                            .find(person => person.job === 'Director')
                            ?.name || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Cast</h3>
                        <div className="flex flex-wrap gap-2">
                          {movieDetails.credits.cast.slice(0, 3).map(actor => (
                            <span key={actor.id} className="text-sm">
                              {actor.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieDetailsModal; 