const SummaryBar = ({ movies }) => {
  const total = movies.length;
  const watched = movies.filter((movie) => movie.watched).length;
  const unwatched = movies.filter((movie) => !movie.watched).length;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="stat rounded-lg bg-base-200 shadow">
        <div className="stat-title">Total</div>
        <div className="stat-value">{total}</div>
      </div>

      <div className="stat rounded-lg bg-base-200 shadow">
        <div className="stat-title">Watched</div>
        <div className="stat-value">{watched}</div>
      </div>

      <div className="stat rounded-lg bg-base-200 shadow">
        <div className="stat-title">Unwatched</div>
        <div className="stat-value">{unwatched}</div>
      </div>
    </div>
  );
};

export default SummaryBar;