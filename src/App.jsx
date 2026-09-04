// src/App.jsx

import { useEffect, useState } from "react";

import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";

import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

import moviesData from "./data/movies";

import {
  searchMovies,
  toWatchlistMovie,
} from "./api/tmdb";

export default function App() {
  // =====================================================
  // EXISTING MOVIES STATE
  // =====================================================

  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");

    return saved ? JSON.parse(saved) : moviesData;
  });

  // =====================================================
  // EXISTING FILTER STATE
  // =====================================================

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  // =====================================================
  // NEW TMDB SEARCH STATE
  // =====================================================

  const [results, setResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  // =====================================================
  // SAVE MOVIES TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "movies",
      JSON.stringify(movies)
    );
  }, [movies]);

  // =====================================================
  // UPDATE BROWSER TAB TITLE
  // =====================================================

  useEffect(() => {
    document.title = `Movie Watchlist (${movies.length})`;
  }, [movies.length]);

  // =====================================================
  // SAVE FILTER TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // =====================================================
  // TMDB SEARCH
  // =====================================================

  useEffect(() => {
    // Do not fetch when search is empty
    if (!searchTerm) {
      setResults([]);
      return;
    }

    // Prevent old search results from replacing
    // newer search results
    let isCancelled = false;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movies = await searchMovies(searchTerm);

        if (!isCancelled) {
          setResults(movies);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            "Failed to fetch movies. Try again."
          );
          setResults([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    // Cleanup
    return () => {
      isCancelled = true;
    };
  }, [searchTerm]);

  // =====================================================
  // SEARCH HANDLER
  // =====================================================

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // =====================================================
  // ADD MOVIE FROM TMDB SEARCH
  // =====================================================

  const handleAddFromSearch = (tmdbMovie) => {
    // Prevent duplicate movies
    if (
      movies.some(
        (movie) => movie.id === tmdbMovie.id
      )
    ) {
      return;
    }

    // Convert TMDB movie to our watchlist format
    const watchlistMovie =
      toWatchlistMovie(tmdbMovie);

    setMovies([...movies, watchlistMovie]);
  };

  // =====================================================
  // TOGGLE WATCHED STATUS
  // =====================================================

  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              watched: !movie.watched,
            }
          : movie
      )
    );
  };

  // =====================================================
  // DELETE MOVIE
  // =====================================================

  const handleDeleteMovie = (id) => {
    setMovies(
      movies.filter((movie) => movie.id !== id)
    );
  };

  // =====================================================
  // ADD MOVIE MANUALLY
  // =====================================================

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // =====================================================
  // CLEAR ALL MOVIES
  // =====================================================

  const handleClearAll = () => {
    if (
      confirm(
        "Clear your entire watchlist? This cannot be undone."
      )
    ) {
      setMovies([]);
    }
  };

  // =====================================================
  // FILTER MOVIES
  // =====================================================

  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return movie.watched;
    }

    if (filter === "unwatched") {
      return !movie.watched;
    }

    return true;
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Layout>
      {/* ================================================
          TMDB SEARCH
          ================================================ */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Movie Search
        </h1>

        <p className="opacity-70">
          Search TMDB and add movies to your watchlist.
        </p>

        <SearchBar
          onSearch={handleSearch}
        />

        <SearchResults
          results={results}
          onAdd={handleAddFromSearch}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {/* ================================================
          EXISTING WATCHLIST
          ================================================ */}

      <div className="flex items-center justify-between mb-6">
        <SummaryBar movies={movies} />

        <button
          className="btn btn-error btn-sm"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      {/* Page Header */}

      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          My Watchlist
        </h2>

        <p className="opacity-70">
          A collection of movies I've watched and want
          to watch.
        </p>
      </div>

      {/* Add Movie Form */}

      <AddMovieForm
        onAddMovie={handleAddMovie}
      />

      {/* Filter Bar */}

      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      {/* Movie List */}

      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />
    </Layout>
  );
}