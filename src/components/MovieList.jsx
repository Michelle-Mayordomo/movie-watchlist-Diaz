import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster={movie.poster}
          year={movie.year}
          genre={movie.genre}
          rating={movie.rating}
          watched={movie.watched}
        />
      ))}
    </div>
  );
}

export default MovieList;