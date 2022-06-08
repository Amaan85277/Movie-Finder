import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./Component/MovieList";
import MovieListHeading from "./Component/MovieListHeading";
import SearchBox from "./Component/SearchBox";
import AddFavourites from "./Component/AddFavourites";
import RemoveFavourite from "./Component/RemoveFavourite";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3f690bcc`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // useEffect on mount i.e. when ever the page renders/reloads
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    setFavourite(movieFavourites);
  }, []);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourite, movie];
    setFavourite(newFavouriteList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourite.filter(
      (item) => item.imdbID != movie.imdbID
    );
    setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourite}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        />
      </div>
    </div>
  );
};

export default App;
