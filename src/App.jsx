import { useState } from "react";
import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import moviesData from "./data/movies";

export default function App() {
  const [movies, setMovies] = useState(moviesData);
  const [filter, setFilter] = useState("all");

  // Toggle watched status
  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  // Delete a movie
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Add a movie
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Filter movies
  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });

  return (
    <Layout>
      {/* Live Summary */}
      <SummaryBar movies={movies} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>

        <p className="opacity-70">
          A collection of movies I've watched and want to watch.
        </p>
      </div>

      {/* Add Movie Form */}
      <AddMovieForm onAddMovie={handleAddMovie} />

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