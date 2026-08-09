function MovieCard({ title, poster, year, genre, rating, watched }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={poster} alt={title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {title}
          {rating >= 8 && (
            <span className="badge badge-warning">Top Rated</span>
          )}
        </h2>

        <p>
          {genre} • {year}
        </p>

        <p>⭐ {rating}</p>

        <div className="card-actions justify-end">
          {watched ? (
            <span className="badge badge-success">Watched ✓</span>
          ) : (
            <span className="badge badge-ghost">Unwatched</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;