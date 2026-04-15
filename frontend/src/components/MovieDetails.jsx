import './MovieDetails.css'

function MovieDetails({ movie, onClose, onEdit, onDelete }) {
  if (!movie) return null

  const hours = Math.floor(movie.runtime / 60)
  const mins = movie.runtime % 60

  const handleDelete = () => {
    const confirm = window.confirm(`Delete "${movie.title}"?`)
    if (confirm) {
      onDelete(movie.id)
      onClose()
    }
  }

  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="details-close" onClick={onClose}>✕</button>
        <div className="details-top">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="details-poster"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x300/1a1a2e/fff?text=No+Image'
            }}
          />
          <div className="details-info">
            <span className="details-badge">MOVIE</span>
            <h2 className="details-title">{movie.title}</h2>
            <div className="details-meta">
              <span className="imdb-tag">IMDB {movie.vote_average}</span>
              <span className="meta-item">{new Date(movie.release_date).getFullYear()}</span>
              <span className="meta-item">{hours}h {mins}min</span>
              <span className="meta-item">{movie.genres}</span>
            </div>
            <p className="details-overview">{movie.overview}</p>
            <div className="details-stats">
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">⭐ {movie.vote_average} / 10</span>
              </div>
              <div className="stat">
                <span className="stat-label">Status</span>
                <span className="stat-value released">Released</span>
              </div>
              <div className="stat">
                <span className="stat-label">Language</span>
                <span className="stat-value">{movie.original_language?.toUpperCase() || 'EN'}</span>
              </div>
            </div>

            {/* الأزرار محدّثة */}
            <div className="details-actions">
              <button className="btn-watch">▶ Watch Now</button>
              <button className="btn-edit" onClick={() => onEdit(movie)}>
                ✏ Edit
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails