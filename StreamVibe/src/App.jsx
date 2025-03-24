import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MoviesXShows from "./pages/MoviesXShows";
import Support from "./pages/Support";
import Subscriptions from "./pages/Subscriptions";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const App = () => {
  let [moviesData, setMoviesData] = useState([]);
  let [movieGenreId, setMovieGenreId] = useState([]);
  let [movieGenreData, setMovieGenreData] = useState([]);
  let [movieTopTen, setMovieTopTen] = useState([]);
  let [movieGenreName, setMovieGenreName] = useState([]);

  let [seriesData, setSeriesData] = useState([]);
  let [seriesGenreData, setSeriesGenreData] = useState([]);
  let [seriesTopTen, setSeriesTopTen] = useState([]);
  let [seriesGenreName, setSeriesGenreName] = useState([]);
  let [seriesGenreId, setSeriesGenreId] = useState([]);

  /* const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US"; */
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTJkYjY1ODRmMWJiMGI3NjRmMWJmNDQ1YjUwM2Q4MyIsIm5iZiI6MTczNTY1NDQxNS41MDgsInN1YiI6IjY3NzNmYzBmY2ZlNjI2NDRkZjEzNTlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pk3RyAEEF9i65lV6qepQ5vPo_pPJsiWTtsRFYf31_LU",
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => {
        const genreId = data.genres.map((value) => value.id);
        setMovieGenreId(genreId);
        const genreName = data.genres.map((value) => value.name);
        setMovieGenreName(genreName);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
      .then((res) => res.json())
      .then((data) => {
        const genreId = data.genres.map((value) => value.id);
        setSeriesGenreId(genreId);
        const genreName = data.genres.map((value) => value.name);
        setSeriesGenreName(genreName);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    async function fetchMultipleSeries() {
      try {
        const request = seriesGenreId.map((genreId) =>
          fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${options.headers.Authorization}&with_genres=${genreId}`,
            options
          ).then((res) => res.json())
        );

        const results = await Promise.all(request);
        const topTen = await results.map((value) => {
          return value.results.splice(6, 4);
        });

        const categoryData = await results.map((value) => {
          setSeriesTopTen(() => value.results.splice(1, 4));
          return value.results.splice(6, 4);
        });

        setSeriesGenreData(categoryData);
        setSeriesTopTen(topTen);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMultipleSeries();
  }, [movieGenreId.length]);

  useEffect(() => {
    async function fetchMultiple() {
      try {
        const request = movieGenreId.map((genreId) =>
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${options.headers.Authorization}&with_genres=${genreId}`,
            options
          ).then((res) => res.json())
        );

        const results = await Promise.all(request);
        const topTen = await results.map((value) => {
          return value.results.splice(6, 4);
        });

        const categoryData = await results.map((value) => {
          setMovieTopTen(() => value.results.splice(1, 4));
          return value.results.splice(6, 4);
        });

        setMovieGenreData(categoryData);
        setMovieTopTen(topTen);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMultiple();
  }, [movieGenreId.length]);

  /*  useEffect(() => {
    console.log(movieGenreData);
  }, [movieGenreId.length]); */

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const poster = data.results.map((value) => value);
        setMoviesData(poster);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const poster = data.results.map((value) => value);
        setSeriesData(poster);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="text-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movieGenreName={movieGenreName}
              seriesData={seriesData}
              moviesData={moviesData}
              movieGenreData={movieGenreData}
            />
          }
        />
        <Route
          path="/moviesXshows"
          element={
            <MoviesXShows
              moviesData={moviesData}
              movieGenreName={movieGenreName}
              movieGenreData={movieGenreData}
              movieTopTen={movieTopTen}
              seriesData={seriesData}
              seriesGenreName={seriesGenreName}
              seriesGenreData={seriesGenreData}
              seriesTopTen={seriesTopTen}
            />
          }
        />
        <Route path="/support" element={<Support moviesData={moviesData} />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </div>
  );
};

export default App;
