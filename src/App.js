import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite'
import RemoveFavourite from './components/RemoveFavourite'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])  

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=9dbe35fe`
    const response = await fetch(url)
    const responseJson = await response.json()

    console.log(responseJson.Search)
    if(responseJson.Search)
      setMovies(responseJson.Search)
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
    setFavourites(movieFavourites)
  }, [])



  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    // console.log(movie)
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  }

  const removeFavouriteMovie = (movie) => {
    // console.log(movie)
    const newFavouriteList = favourites.filter((fav) => fav.imdbID !== movie.imdbID)
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)  
  }

  return (
    <div className="container-fluid movie-app">

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies"/>
        <SearchBox 
          searchValue={searchValue} 
          setSearchValue={setSearchValue}/>
      </div>

      <div className="row">
        <MovieList 
          movies={movies} 
          handleFavouriteClick={addFavouriteMovie} 
          FavouriteComponent={AddFavourite}/>  
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites"/>
      </div>

      <div className="row">
        <MovieList 
          movies={favourites} 
          handleFavouriteClick={removeFavouriteMovie} 
          FavouriteComponent={RemoveFavourite}/>  
      </div>
      
    </div>
  )
}

export default App
