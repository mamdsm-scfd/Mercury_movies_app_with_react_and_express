import { useState } from 'react'
import './EditMovieForm.css'

function EditMovieForm({ movie, onClose, onEditMovie }) {
  const [form, setForm] = useState({
    title: movie.title || '',
    vote_average: movie.vote_average || '',
    release_date: movie.release_date || '',
    runtime: movie.runtime || '',
    genres: movie.genres || '',
    overview: movie.overview || '',
    poster_path: movie.poster_path || '',
    backdrop_path: movie.backdrop_path || '',
    original_language: movie.original_language || 'en',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim())       newErrors.title = 'Title is required'
    if (!form.vote_average)       newErrors.vote_average = 'Rating is required'
    if (form.vote_average < 0 || form.vote_average > 10)
                                  newErrors.vote_average = 'Rating must be 0 - 10'
    if (!form.release_date)       newErrors.release_date = 'Release date is required'
    if (!form.runtime)            newErrors.runtime = 'Runtime is required'
    if (!form.genres.trim())      newErrors.genres = 'Genres is required'
    if (!form.overview.trim())    newErrors.overview = 'Overview is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      const updatedMovie = {
        ...movie,
        ...form,
        vote_average: parseFloat(form.vote_average),
        runtime: parseInt(form.runtime),
      }
      onEditMovie(updatedMovie)
      setLoading(false)
      onClose()
    }, 600)
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>

        <div className="edit-header">
          <div className="edit-header-left">
            <span className="edit-badge">EDITING</span>
            <h2 className="edit-title">Edit Movie</h2>
          </div>
          <button className="edit-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-body">

          {/* Title */}
          <div className="edit-group">
            <label>Title <span className="required">*</span></label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. The Dark Knight"
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          {/* Row: Rating + Runtime */}
          <div className="edit-row">
            <div className="edit-group">
              <label>Rating (0-10) <span className="required">*</span></label>
              <input
                type="number"
                name="vote_average"
                value={form.vote_average}
                onChange={handleChange}
                placeholder="e.g. 8.5"
                min="0"
                max="10"
                step="0.1"
                className={errors.vote_average ? 'input-error' : ''}
              />
              {errors.vote_average && <span className="error-msg">{errors.vote_average}</span>}
            </div>

            <div className="edit-group">
              <label>Runtime (min) <span className="required">*</span></label>
              <input
                type="number"
                name="runtime"
                value={form.runtime}
                onChange={handleChange}
                placeholder="e.g. 148"
                min="1"
                className={errors.runtime ? 'input-error' : ''}
              />
              {errors.runtime && <span className="error-msg">{errors.runtime}</span>}
            </div>
          </div>

          {/* Row: Release Date + Language */}
          <div className="edit-row">
            <div className="edit-group">
              <label>Release Date <span className="required">*</span></label>
              <input
                type="date"
                name="release_date"
                value={form.release_date}
                onChange={handleChange}
                className={errors.release_date ? 'input-error' : ''}
              />
              {errors.release_date && <span className="error-msg">{errors.release_date}</span>}
            </div>

            <div className="edit-group">
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
          <div className="edit-group">
            <label>Genres <span className="required">*</span></label>
            <input
              type="text"
              name="genres"
              value={form.genres}
              onChange={handleChange}
              placeholder="e.g. Action, Sci-Fi, Drama"
              className={errors.genres ? 'input-error' : ''}
            />
            {errors.genres && <span className="error-msg">{errors.genres}</span>}
          </div>

          {/* Overview */}
          <div className="edit-group">
            <label>Overview <span className="required">*</span></label>
            <textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
              rows={4}
              className={errors.overview ? 'input-error' : ''}
            />
            {errors.overview && <span className="error-msg">{errors.overview}</span>}
          </div>

          {/* Poster URL */}
          <div className="edit-group">
            <label>Poster URL <span className="optional">(optional)</span></label>
            <div className="poster-row">
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
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              )}
            </div>
          </div>

          {/* Backdrop URL */}
          <div className="edit-group">
            <label>Backdrop URL <span className="optional">(optional)</span></label>
            <input
              type="text"
              name="backdrop_path"
              value={form.backdrop_path}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {/* Buttons */}
          <div className="edit-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : '✓ Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditMovieForm