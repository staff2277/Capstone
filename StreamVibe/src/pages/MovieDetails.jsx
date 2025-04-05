import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdb';

const MovieDetails = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await getMovieDetails(id);
        setMovieDetails(details);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!movieDetails) return null;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Backdrop Image with Gradient Overlay */}
      <div className="relative h-[60vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="rounded-lg shadow-xl"
            />
          </div>

          {/* Movie Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movieDetails.title}</h1>
            
            {/* Basic Info */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-400">
                {movieDetails.vote_average.toFixed(1)}/10
              </span>
              <span>{new Date(movieDetails.release_date).getFullYear()}</span>
              <span>{movieDetails.runtime} min</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movieDetails.genres.map(genre => (
                <span
                  key={genre.id}
                  className="bg-[#1A1A1A] px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movieDetails.overview}</p>
            </div>

            {/* Cast */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movieDetails.credits.cast.slice(0, 8).map(actor => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="font-semibold">{actor.name}</p>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Crew */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movieDetails.credits.crew
                  .filter(person => ['Director', 'Writer', 'Producer'].includes(person.job))
                  .slice(0, 8)
                  .map(person => (
                    <div key={person.id} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                        alt={person.name}
                        className="w-full rounded-lg mb-2"
                      />
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-gray-400">{person.job}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Similar Movies */}
            {movieDetails.similar && movieDetails.similar.results.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movieDetails.similar.results.slice(0, 4).map(movie => (
                    <div
                      key={movie.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-lg mb-2"
                      />
                      <p className="font-semibold">{movie.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 