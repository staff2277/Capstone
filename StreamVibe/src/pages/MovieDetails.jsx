import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../services/tmdb';
import ReviewSection from '../components/ReviewSection';

const MovieDetails = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id, type);
        setMovie(data);
        
        const similar = await getSimilarMovies(id, type);
        setSimilarMovies(similar.results.slice(0, 6));
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, type]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      <div className="relative h-96">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-4xl font-bold mb-4">{movie.title || movie.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
              {movie.runtime && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map(genre => (
                <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-8">{movie.overview}</p>

            {/* Cast */}
            {movie.credits?.cast && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movie.credits.cast.slice(0, 4).map(person => (
                    <div key={person.id} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto mb-2"
                      />
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crew */}
            {movie.credits?.crew && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Crew</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movie.credits.crew.slice(0, 4).map(person => (
                    <div key={person.id} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto mb-2"
                      />
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-gray-400">{person.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection movieId={id} movieType={type} />

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar {type === 'movie' ? 'Movies' : 'TV Shows'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarMovies.map(movie => (
                <div
                  key={movie.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}/${type}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full rounded-lg shadow-lg hover:opacity-75 transition-opacity"
                  />
                  <p className="mt-2 font-medium">{movie.title || movie.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails; 