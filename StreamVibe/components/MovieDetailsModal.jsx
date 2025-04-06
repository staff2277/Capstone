import { motion, AnimatePresence } from 'framer-motion';
import { getMovieDetails } from '../services/tmdb';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from './AuthContext';

const MovieDetailsModal = ({ isOpen, onClose, movieId, type = 'movie' }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!movieId) return;
    
    setLoading(true);
    setError(null);
    try {
      const fetchMovieDetails = async () => {
        const details = await getMovieDetails(movieId, type);
        setMovieDetails(details);
      };
      fetchMovieDetails();
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  }, [movieId, type]);

  const handleViewMore = () => {
    if (isAuthenticated) {
      navigate(`/movie/${movieId}/${type}`);
      onClose();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigate(`/movie/${movieId}/${type}`);
    onClose();
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
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
                      alt={movieDetails.title || movieDetails.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
                        alt={movieDetails.title || movieDetails.name}
                        className="w-48 h-72 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          {movieDetails.title || movieDetails.name}
                        </h2>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-yellow-400">
                            {movieDetails.vote_average.toFixed(1)}/10
                          </span>
                          <span>
                            {new Date(movieDetails.release_date || movieDetails.first_air_date).getFullYear()}
                          </span>
                          {type === 'movie' ? (
                            <span>{formatRuntime(movieDetails.runtime)}</span>
                          ) : (
                            <span>{movieDetails.number_of_seasons} seasons</span>
                          )}
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
                        {type === 'movie' ? (
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
                        ) : (
                          <div>
                            <h3 className="font-semibold mb-2">Created By</h3>
                            <div className="flex flex-wrap gap-2">
                              {movieDetails.created_by.map(creator => (
                                <span key={creator.id} className="text-sm">
                                  {creator.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <button
                          onClick={handleViewMore}
                          className="mt-6 bg-[#E50000] hover:bg-[#cc0000] text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          View More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default MovieDetailsModal; 