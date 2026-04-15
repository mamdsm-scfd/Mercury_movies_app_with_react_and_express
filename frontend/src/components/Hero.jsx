import "./Hero.css";

function Hero({ movie, onPrev, onNext, onDetailsClick }) {

    if (!movie) return null

  const minutes = movie.runtime;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;


  return (
    <div className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      />

      <div className="hero-gradient"></div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span className="imdb-badge">IMDB</span>
          <span>{movie.vote_average}</span>
          <span className="dot">•</span>
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span className="dot">•</span>
          <span>
            {hours}h {mins}min
          </span>
          <span className="dot">•</span>
          <span>{movie.genres}</span>
        </div>
        <p className="hero-desc">{movie.overview}</p>
        <button className="btn-details" onClick={onDetailsClick}>
          More Details
        </button>
      </div>

      <div className="hero-nav">
        <button className="nav-btn" onClick={onPrev}>&#8249;</button>
        <button className="nav-btn" onClick={onNext}>&#8250;</button>
      </div>
    </div>
  );
}


export default Hero;