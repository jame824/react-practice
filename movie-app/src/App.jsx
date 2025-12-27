import { useState, useEffect } from 'react';
import Search from './components/search';
import MovieCard from './components/MovieCard';
import Spinner from './components/Spinner';
import { useDebounce } from 'use-debounce';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([]);

  const [trendingIsLoading, setTrendingIsLoading] = useState(false);
  const [trendingErrorMessage, setTrendingErrorMessage] = useState('');
  const [trendingMoviesList, setTrendingMoviesList] = useState([]);
  
  const fetchMovies = async (query = '') => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const endpoint = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === 'false') {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);

      if (data.results.length > 0 && query) {
        updateSearchCount(query, data.results[0]);
      }
    } catch(e) { 
      setErrorMessage(`Error fetching movies: ${e}`)
      throw new Error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    setTrendingIsLoading(true);
    setTrendingErrorMessage('');
    try {
      const movies = await getTrendingMovies();

      setTrendingMoviesList(movies);
    } catch (e) {
      setTrendingErrorMessage(`Error fetching movies: ${e}`)
      throw new Error(e);
    } finally {
      setTrendingIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm)
  }, [searchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  

  return (
    <main>
      <div className='pattern'/>

      <section className='wrapper'>
        <header>
          <img src="hero.png" alt="hero banner"/>

          <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMoviesList.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            {trendingIsLoading ? (
              <Spinner/>
            ) : trendingErrorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {trendingMoviesList.map((movie, index) =>
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt="movie-poster"/>
                </li>)}
              </ul>
            )}
          </section>)
        }

        <section className='all-movies'>
          <h2>All Movies</h2>
          
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.key} movie={movie}/>)
              )}
            </ul>
          )}

        </section>

      </section>
    </main>
  )
};

export default App;