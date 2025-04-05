import GridText from "../../components/GridText";
import Categories from "../../components/Categories";
import Devices from "../../components/Devices";
import SubPlan from "../../components/SubPlan";
import Trial from "../../components/Trial";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieDetailsModal from "../../components/MovieDetailsModal";

const Home = ({ seriesData, moviesData, movieGenreName, movieGenreData }) => {
  let seriesPoster = seriesData.map((value) => value.poster_path);
  let moviesPoster = moviesData.map((value) => value.poster_path);

  const genreImg = movieGenreData.flat().map((value) => value.poster_path);
  const genreName = movieGenreName.map((value) => value);

  const [merged, setMerged] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMerged([...moviesPoster, ...seriesPoster]);
  }, [seriesData, moviesData]);

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="relative">
      <div className="h-screen grid sm:grid-cols-1 5s:grid-rows-[65%_auto] max-5s:grid-rows-[70%_auto] ">
        <div className="content-center justify-items-center">
          <div className="max-sm:w-[15rem] sm:w-[20rem] max-5s:w-[10rem] sm:mt-[7rem]">
            <img src="/static/images/play.svg" alt="" />
          </div>
        </div>
        <div className="content-start justify-items-start">
          <GridText />
        </div>
      </div>
      <div className="bg-double-gradient grid-cols-[repeat(auto-fit,minmax(auto,1fr))] overflow-hidden absolute z-[-20] h-[75vh] w-full inset-0 gap-3 grid md:grid-cols-[repeat(auto-fit,minmax(9.375rem,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(6.25rem,1fr))] max-sm:grid-cols-[repeat(auto-fit,minmax(5.9375rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))]  3xl:grid-cols-[repeat(auto-fit,minmax(20.5rem,1fr))]">
        <div className="absolute h-screen w-full bg-transparent-gradient z-10"></div>
        {merged &&
          merged.map((value, index) => (
            <div className="" key={index}>
              <img
                className="rounded-2xl"
                src={`https://image.tmdb.org/t/p/w500${value}`}
                alt="grid"
              />
            </div>
          ))}
      </div>
      <div className="sm:px-[5%] max-sm:px-[15px]">
        <Categories
          genreName={genreName}
          movieGenreData={movieGenreData}
          genreImg={genreImg}
        />
        <Devices />
        <SubPlan />
        <Trial />
      </div>
      <Footer />
      
      <MovieDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieId={selectedMovie?.id}
        type={selectedMovie?.media_type}
      />
    </div>
  );
};

Home.propTypes = {
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
    })
  ).isRequired,
  moviesData: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
    })
  ).isRequired,
  movieGenreName: PropTypes.arrayOf(PropTypes.string).isRequired,
  movieGenreData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
};

export default Home;
