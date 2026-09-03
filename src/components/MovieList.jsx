import MovieCard from "./MovieCard";

function MovieList({ movies, onToggleWatched, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          onToggleWatched={onToggleWatched}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MovieList;