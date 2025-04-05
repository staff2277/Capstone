import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMovies } from '../services/tmdb';
import MovieDetailsModal from './MovieDetailsModal';

const Search = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Search component mounted or isOpen changed:", isOpen);
  }, [isOpen]);

  useEffect(() => {
    const searchMoviesFromTMDB = async () => {
      if (searchQuery.length < 2) {
        console.log("Search query too short:", searchQuery);
        setSearchResults([]);
        return;
      }

      console.log("Starting search for:", searchQuery);
      setLoading(true);
      setError(null);
      try {
        const results = await searchMovies(searchQuery);
        console.log("Search response received:", results);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setError(error.message);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMoviesFromTMDB, 500);
    return () => {
      console.log("Cleaning up search timer");
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMovie(null);
  };

  if (!isOpen) {
    console.log("Search modal not open, returning null");
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20"
        onClick={() => {
          console.log("Modal background clicked");
          onClose();
        }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-[#1A1A1A] w-full max-w-2xl mx-4 rounded-xl p-4"
          onClick={e => {
            console.log("Modal content clicked");
            e.stopPropagation();
          }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                console.log("Input changed:", e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search for movies..."
              className="w-full bg-[#0F0F0F] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]"
              autoFocus
            />
            {loading && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 mt-2 text-sm">
              Error: {error}
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mt-4 max-h-96 overflow-y-auto">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="p-4 hover:bg-[#0F0F0F] rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="flex gap-4">
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">{movie.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {movie.overview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery.length >= 2 && !loading && !error && searchResults.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              No movies found for "{searchQuery}"
            </div>
          )}
        </motion.div>
      </motion.div>
      <MovieDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        movieId={selectedMovie?.id}
        type={selectedMovie?.media_type || 'movie'}
      />
    </AnimatePresence>
  );
};

export default Search; 