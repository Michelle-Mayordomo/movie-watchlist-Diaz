import { useState } from "react";

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddMovie({
      id: Date.now(),
      title,
      poster,
      genre,
      year: Number(year),
      rating: Number(rating),
      watched: false,
    });

    // Reset inputs
    setTitle("");
    setPoster("");
    setGenre("");
    setYear("");
    setRating(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg bg-base-200 p-6 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Add a Movie</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="mb-1 block font-semibold">Title</label>
        <input
          type="text"
          placeholder="Movie title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Poster URL */}
      <div className="mb-4">
        <label className="mb-1 block font-semibold">Poster URL</label>
        <input
          type="url"
          placeholder="https://example.com/poster.jpg"
          className="input input-bordered w-full"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="mb-1 block font-semibold">Genre</label>
        <input
          type="text"
          placeholder="Action, Comedy, Drama..."
          className="input input-bordered w-full"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label className="mb-1 block font-semibold">Year</label>
        <input
          type="number"
          placeholder="2026"
          className="input input-bordered w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="mb-1 block font-semibold">
          Rating: {rating}/10
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="range range-primary"
        />

        <div className="flex justify-between text-sm">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;