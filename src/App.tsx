import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/Layout/Header";
import Banner from "./component/Layout/Banner";
import MovieList from "./component/Layout/MovieList";
import MovieSearch from "./component/Layout/MovieSearch";
import { MovieProvider } from "./component/Context/MovieProvider";
function App() {
  const [movie, setMovie] = useState([]);
  const [treadingMovies, setTrendingMovies] = useState([]);
  const [topRetedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const fetchMovie = async () => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  //       },
  //     };
  //     const url =
  //       "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     setMovie(data.results);
  //     console.log(data);
  //   };
  //   fetchMovie();
  // }, []);
  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
        // Add more URLs here...
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchMovies = async (url) => {
        return await fetch(url, options).then((reponse) => reponse.json());
      };
      try {
        const response = await Promise.all(urls.map(fetchMovies));

        setTrendingMovies(response[0].results);
        setTopRatedMovies(response[1].results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Banner />
          {searchData.length === 0 && (
            <MovieList title={"Phim Hot"} data={treadingMovies.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Phim đề cử" data={topRetedMovies.slice(0, 10)} />
          )}
          {/* <MovieSearch data={searchData} /> */}
          {searchData.length > 0 && <MovieSearch data={searchData} />}
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
