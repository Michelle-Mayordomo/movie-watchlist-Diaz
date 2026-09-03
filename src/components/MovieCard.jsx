function MovieCard({
  id,
  title,
  poster,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onDelete,
}) {
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
            <button
              className="badge badge-success cursor-pointer"
              onClick={() => onToggleWatched(id)}
            >
              Watched ✓
            </button>
          ) : (
            <button
              className="badge badge-ghost cursor-pointer"
              onClick={() => onToggleWatched(id)}
            >
              Unwatched
            </button>
          )}

          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;