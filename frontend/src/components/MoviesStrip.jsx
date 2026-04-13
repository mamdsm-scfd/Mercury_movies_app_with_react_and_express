import MovieCard from './MovieCard'
import './MoviesStrip.css'

function MoviesStrip({ movies, activeId, onSelectMovie }) {
  return (
    <div className="movies-strip">
      <h2 className="strip-title">All Movies</h2>
      <div className="movies-row">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isActive={movie.id === activeId}
            onClick={onSelectMovie}
          />
        ))}
      </div>
    </div>
  )
}

export default MoviesStrip