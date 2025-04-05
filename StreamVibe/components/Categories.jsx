import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import MovieDetailsModal from "./MovieDetailsModal";

const Categories = ({ genreName, genreImg, title, movieGenreData }) => {
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let category = genreName.map((value) => value);
  let categoryImg = genreImg;

  const container = useRef(null);

  const onClickLeft = () => {
    if (container.current) {
      const scrollAmount =
        container.current.querySelector(".snap-start").offsetWidth;
      container.current.scrollLeft -= scrollAmount;
    }
  };

  const onClickRight = () => {
    if (container.current) {
      const scrollAmount =
        container.current.querySelector(".snap-start").offsetWidth;
      container.current.scrollLeft += scrollAmount;
    }
  };

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="my-[5rem]">
      <div className="flex items-center ">
        <div>
          <p
            className={clsx({
              hidden: location.pathname === "/",
              "5s:text-[2rem] sm:text-[2.5rem] max-5s:text-[1rem] font-bold ml-5":
                location.pathname === "/moviesXshows",
            })}
          >
            {title}
          </p>
        </div>
        <span
          className={clsx({
            hidden: location.pathname === "/moviesXshows",
            "w-full": location.pathname === "/",
          })}
        >
          <h1 className="5s:text-[2rem] sm:text-[2.5rem] max-5s:text-[1rem] font-bold">
            Explore our wide variety of categories
          </h1>
          <p className="my-3 text-[#999999] sm:text-[1rem] max-5s:text-[0.8rem]">
            Whether you&#39;re looking for a comedy to make you laugh, a drama
            to make you think, or a documentary to learn something new ok
          </p>
        </span>
      </div>
      <div>
        <div
          ref={container}
          className="relative  flex  overflow-x-hidden snap-mandatory snap-x snap-item"
        >
          {category.map((genre, index) => {
            // Get the movies for this specific genre
            const genreMovies = movieGenreData?.[index] || [];
            // Take only the first 4 movies for this genre
            const moviesToShow = genreMovies.slice(0, 4);
            
            return (
              <div
                key={index}
                className="my-[4rem] mr-[1.5rem] p-[20px] bg-[#1A1A1A] rounded-lg snap-start"
              >
                <div className="grid grid-cols-[130px_130px] gap-2 grid-rows-2">
                  {moviesToShow.map((movie, i) => (
                    <div
                      key={i}
                      className="relative group cursor-pointer"
                      onClick={() => handlePosterClick(movie)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="rounded-md w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {movie.title || movie.name || 'Movie'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2">
                  <span className="mr-auto">{genre}</span>
                  <span>
                    <img src="/images/right.svg" alt="" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" flex justify-center text-[3rem] gap-2">
          <div
            onClick={onClickLeft}
            className=" sm:p-5 max-sm:p-3 bg-[#3a3a3a] hover:bg-[#1A1A1A] rounded-lg mr-2 cursor-pointer"
          >
            <img src="/static/images/left.svg" className="" alt="left icon" />
          </div>
          <div
            onClick={onClickRight}
            className="sm:p-5  max-sm:p-3 bg-[#3a3a3a] hover:bg-[#1A1A1A] rounded-lg mr-2 cursor-pointer"
          >
            <img src="/static/images/right.svg" className="" alt="right icon" />
          </div>
        </div>
      </div>
      <MovieDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieId={selectedMovie?.id}
        type={selectedMovie?.media_type}
      />
    </div>
  );
};

Categories.propTypes = {
  genreName: PropTypes.arrayOf(PropTypes.string).isRequired,
  genreImg: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  movieGenreData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        poster_path: PropTypes.string,
        media_type: PropTypes.string,
      })
    )
  ),
};

export default Categories;
