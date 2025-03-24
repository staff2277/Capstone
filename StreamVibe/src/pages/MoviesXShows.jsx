import { useState } from "react";
import PropTypes from "prop-types";
import Categories from "../../components/Categories";
import Preview from "../../components/Preview";
import Trending from "../../components/Trending";
import Trial from "../../components/Trial";
import Footer from "../../components/Footer";
import clsx from "clsx";

const MoviesXShows = ({
  moviesData,
  movieGenreName,
  movieGenreData,
  movieTopTen,
  seriesData,
  seriesGenreName,
  seriesGenreData,
  seriesTopTen,
}) => {
  const [toggleMovies, setToggleMovies] = useState(true);
  const [toggleSeries, setToggleSeries] = useState(false);

  const trending = toggleSeries ? seriesData : moviesData;

  const genreImg = toggleSeries
    ? seriesGenreData.flat().map((value) => value.poster_path)
    : movieGenreData.flat().map((value) => value.poster_path);

  const genreName = toggleSeries
    ? seriesGenreName.map((value) => value)
    : movieGenreName.map((value) => value);

  const topTen = toggleSeries
    ? seriesTopTen.flat().map((value) => value.poster_path)
    : movieTopTen.flat().map((value) => value.poster_path);

  return (
    <div className="">
      <div>
        <Preview moviesData={moviesData} />
      </div>
      <div className="mt-[5rem]  sm:px-[5%] max-sm:px-[15px]">
        <div className="border-2 border-[#1F1F1F] relative">
          <div
            onClick={() => {
              if (toggleMovies) {
                return;
              } else {
                setToggleMovies((previous) => {
                  setToggleSeries((prevstate) => !prevstate);
                  return !previous;
                });
              }
            }}
            className={clsx({
              "inline-block absolute top-[-60px] left-[20px] normal-case hover:bg-[#0754e2] focus:outline-none focus:ring active:bg-[#E50000] focus:ring-[#cac8c896] max-sm:px-[2rem] max-sm:py-[1rem] rounded-lg  sm:px-[3rem] sm:py-[1.3rem] max-5s:px-[1rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8": true,
              "bg-[#E50000] active:bg-none": toggleMovies,
              "bg-[#2b2a2a] hover:bg-[#3b3b3b] ": !toggleMovies,
            })}
          >
            Movies
          </div>
          <div
            onClick={() => {
              if (toggleSeries) {
                return;
              } else {
                setToggleMovies((previous) => {
                  setToggleSeries((prevstate) => !prevstate);
                  return !previous;
                });
              }
            }}
            className={clsx({
              "inline-block absolute top-[-60px] active:bg-[#E50000] left-[200px] normal-case hover:bg-[#0754e2] focus:outline-none focus:ring focus:ring-[#cac8c896] max-sm:px-[2rem] max-sm:py-[1rem] rounded-lg  sm:px-[3rem] sm:py-[1.3rem] max-5s:px-[1rem] max-5s:py-[0.5rem] max-5s:text-[0.9rem] max-5s:mt-[10px] 5s:mt-8": true,
              "bg-[#E50000] ": toggleSeries,
              "bg-[#2b2a2a] hover:bg-[#3b3b3b] ": !toggleSeries,
            })}
          >
            Series
          </div>
          <div>
            <Categories
              genreName={genreName}
              movieGenreData={movieGenreData}
              title="Our Genres"
              genreImg={genreImg}
            />
          </div>
          <div>
            <Categories
              genreName={genreName}
              genreImg={topTen}
              title="Top 10 In Genres"
            />
          </div>
          <div>
            <Trending trending={trending} />
          </div>
        </div>
      </div>
      <div className="mt-[5rem]  sm:px-[5%] max-sm:px-[15px]">
        <Trial />
        <Footer />
      </div>
    </div>
  );
};

MoviesXShows.propTypes = {
  moviesData: PropTypes.arrayOf(
    PropTypes.shape({
      backdrop_path: PropTypes.string,
      title: PropTypes.string,
      overview: PropTypes.string,
    })
  ),
  movieGenreName: PropTypes.arrayOf(PropTypes.string),
  movieGenreData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string,
      })
    )
  ),
  movieTopTen: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string,
      })
    )
  ),
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      backdrop_path: PropTypes.string,
      title: PropTypes.string,
      overview: PropTypes.string,
    })
  ),
  seriesGenreName: PropTypes.arrayOf(PropTypes.string),
  seriesGenreData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string,
      })
    )
  ),
  seriesTopTen: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string,
      })
    )
  ),
};

export default MoviesXShows;
