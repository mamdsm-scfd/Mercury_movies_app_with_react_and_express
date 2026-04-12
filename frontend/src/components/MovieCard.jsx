import './MovieCard.css'

function MovieCard({ movie, isActive, onClick }) {
  return (
    <div
      className={`movie-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(movie)}
    >
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="movie-poster"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/100x140/1a1a2e/fff?text=No+Image' }}
      />
      <div className="movie-card-overlay">
        <span className="movie-card-rating">⭐ {movie.vote_average}</span>
      </div>
    </div>
  )
}

export default MovieCard