import React, { useState, useEffect } from 'react';
import Search from './components/search';
import MovieCard from './components/MovieCard';
import Spinner from './components/Spinner';
import { getTrendingMovies, updateSearchCount } from './appwrite';
import { useDebounce } from 'use-debounce';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [trendError, setTrendError] = useState('');

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok){
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === 'false'){
        setErrorMessage("Failed to fetch moives");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
    } catch (e) {
      console.log(`Error fetching movies: ${e}`);
      setErrorMessage(e);
    } finally {
      setIsLoading(false);
      console.log(isLoading)
    }
    console.log("hello")
  }

  const loadTrendingMovies = async () => {
    setLoadingTrending(false);
    setTrendError('');

    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies)
    } catch (error) {
      console.log(`Error fetching trending movies: ${e}`);
      setTrendError(e);
    } finally {
      setLoadingTrending(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        
        <header>
          <img src='hero.png' alt='logo'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='trending'>
          <h2>Trending Movies</h2>

          {loadingTrending ? (
            <Spinner/>
          ) : trendError ? (
            <p>{trendError}</p>
          ) : trendingMovies.length > 0 &&
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title}/>
              </li>
            ))}
          </ul>
          }
        </section>

        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ): errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App;