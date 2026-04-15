import { useState } from "react";
import "./AddMovieForm.css";

const emptyForm = {
  title: "",
  vote_average: "",
  release_date: "",
  runtime: "",
  genres: "",
  overview: "",
  poster_path: "",
  backdrop_path: "",
  original_language: "en",
};

function AddMovieForm({ onClose, onAddMovie }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.vote_average) newErrors.vote_average = "Rating is required";
    if (form.vote_average < 0 || form.vote_average > 10)
      newErrors.vote_average = "Rating must be 0 - 10";
    if (!form.release_date) newErrors.release_date = "Release date is required";
    if (!form.runtime) newErrors.runtime = "Runtime is required";
    if (!form.genres.trim()) newErrors.genres = "Genres is required";
    if (!form.overview.trim()) newErrors.overview = "Overview is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault()
  const newErrors = validate()
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }


  const movieData = {
    ...form,
    vote_average: parseFloat(form.vote_average),
    runtime: parseInt(form.runtime),
  }

  setLoading(true)
  onAddMovie(movieData)
  setLoading(false)
  onClose()
}
  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2 className="form-title">Add New Movie</h2>
          <button className="form-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          {/* Title */}
          <div className="form-group">
            <label>
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. The Dark Knight"
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          {/* Row: Rating + Runtime */}
          <div className="form-row">
            <div className="form-group">
              <label>
                Rating (0-10) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="vote_average"
                value={form.vote_average}
                onChange={handleChange}
                placeholder="e.g. 8.5"
                min="0"
                max="10"
                step="0.1"
                className={errors.vote_average ? "input-error" : ""}
              />
              {errors.vote_average && (
                <span className="error-msg">{errors.vote_average}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                Runtime (min) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="runtime"
                value={form.runtime}
                onChange={handleChange}
                placeholder="e.g. 148"
                min="1"
                className={errors.runtime ? "input-error" : ""}
              />
              {errors.runtime && (
                <span className="error-msg">{errors.runtime}</span>
              )}
            </div>
          </div>

          {/* Row: Release Date + Language */}
          <div className="form-row">
            <div className="form-group">
              <label>
                Release Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="release_date"
                value={form.release_date}
                onChange={handleChange}
                className={errors.release_date ? "input-error" : ""}
              />
              {errors.release_date && (
                <span className="error-msg">{errors.release_date}</span>
              )}
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                name="original_language"
                value={form.original_language}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
              </select>
            </div>
          </div>

          {/* Genres */}
          <div className="form-group">
            <label>
              Genres <span className="required">*</span>
            </label>
            <input
              type="text"
              name="genres"
              value={form.genres}
              onChange={handleChange}
              placeholder="e.g. Action, Sci-Fi, Drama"
              className={errors.genres ? "input-error" : ""}
            />
            {errors.genres && (
              <span className="error-msg">{errors.genres}</span>
            )}
          </div>

          {/* Overview */}
          <div className="form-group">
            <label>
              Overview <span className="required">*</span>
            </label>
            <textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
              placeholder="Write a short description of the movie..."
              rows={4}
              className={errors.overview ? "input-error" : ""}
            />
            {errors.overview && (
              <span className="error-msg">{errors.overview}</span>
            )}
          </div>

          {/* Poster URL */}
          <div className="form-group">
            <label>
              Poster URL <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              name="poster_path"
              value={form.poster_path}
              onChange={handleChange}
              placeholder="https://..."
            />
            {form.poster_path && (
              <img
                src={form.poster_path}
                alt="preview"
                className="poster-preview"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>

          {/* Backdrop URL */}
          <div className="form-group">
            <label>
              Backdrop URL <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              name="backdrop_path"
              value={form.backdrop_path}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Adding..." : "+ Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
