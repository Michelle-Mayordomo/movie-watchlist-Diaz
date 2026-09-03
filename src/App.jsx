// TODO in App.jsx — new imports
import { useEffect, useState } from "react"; // useEffect might already be imported from Lab 04
import { searchMovies, toWatchlistMovie } from "./api/tmdb";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

// NEW state — for TMDB search
const [results, setResults] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {
 if (!searchTerm) return; // don't fetch on empty search
 let isCancelled = false;
 const fetchResults = async () => {
 setIsLoading(true);
 setError(null);
 try {
 const movies = await searchMovies(searchTerm);
 if (!isCancelled) setResults(movies);
 } catch (err) {
 if (!isCancelled) setError("Failed to fetch movies. Try again.");
 } finally {
 if (!isCancelled) setIsLoading(false);
 }
 };
 fetchResults();
 return () => {
 isCancelled = true; // ignore stale response if user searches again
 };
}, [searchTerm]);

const handleAddFromSearch = (tmdbMovie) => {
 // Avoid adding duplicates
 if (movies.some((m) => m.id === tmdbMovie.id)) return;
 const watchlistMovie = toWatchlistMovie(tmdbMovie);
 setMovies([...movies, watchlistMovie]);
};


return (
 <div className="container mx-auto p-4">
 <h1>Movie Watchlist</h1>
 {/* NEW: TMDB search */}
 <SearchBar onSearch={setSearchTerm} />
 <SearchResults
 results={results}
 onAdd={handleAddFromSearch}
 isLoading={isLoading}
 error={error}
 />
 <hr className="my-6" />
 {/* EXISTING (from Labs 02–04): the personal watchlist */}
 <SummaryBar movies={movies} />
 <AddMovieForm onAddMovie={handleAddMovie} />
 <FilterBar currentFilter={filter} onChangeFilter={setFilter} />
 <MovieList
 movies={visibleMovies}
 onToggleWatched={handleToggleWatched}
onDelete={handleDeleteMovie}
 />
 </div>
);
