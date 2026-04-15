import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MoviesStrip from './components/MoviesStrip'
import MovieDetails from './components/MovieDetails'
import AddMovieForm from './components/AddMovieForm'
import EditMovieForm from './components/EditMovieForm'
import { getMovies, addMovie, updateMovie, deleteMovie } from './services/api'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [movieToEdit, setMovieToEdit] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const fetchMovies = async (searchTerm = '') => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMovies(searchTerm)
      setMovies(data)
      setActiveIndex(0)
    } catch (err) {
      setError('Failed to load movies. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const handlePrev = () => {
    setActiveIndex(i => (i === 0 ? movies.length - 1 : i - 1))
  }

  const handleNext = () => {
    setActiveIndex(i => (i === movies.length - 1 ? 0 : i + 1))
  }

  const handleSelect = (movie) => {
    const index = movies.findIndex(m => m.id === movie.id)
    setActiveIndex(index)
  }

  const handleAddMovie = async (movieData) => {
    try {
      const newMovie = await addMovie(movieData)
      setMovies(prev => [...prev, newMovie])
      setActiveIndex(movies.length)
    } catch (err) {
      alert('Failed to add movie!')
    }
  }

  const handleEditMovie = async (updatedData) => {
    try {
      const updated = await updateMovie(movieToEdit.id, updatedData)
      setMovies(prev =>
        prev.map(m => m.id === updated.id ? updated : m)
      )
    } catch (err) {
      alert('Failed to update movie!')
    }
  }

  const handleDeleteMovie = async (id) => {
    const confirm = window.confirm('Delete this movie?')
    if (!confirm) return
    try {
      await deleteMovie(id)
      setMovies(prev => prev.filter(m => m.id !== id))
      setSelectedMovie(null)
      setActiveIndex(0)
    } catch (err) {
      alert('Failed to delete movie!')
    }
  }

  if (loading) return (
    <div className="app">
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading movies...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="app">
      <div className="error-screen">
        <p>⚠️ {error}</p>
        <button onClick={() => fetchMovies()}>Try Again</button>
      </div>
    </div>
  )

  return (
    <div className="app">
      <Navbar onSearch={setSearch} />

      <Hero
        movie={movies[activeIndex]}
        onPrev={handlePrev}
        onNext={handleNext}
        onDetailsClick={() => setSelectedMovie(movies[activeIndex])}
      />

      <MoviesStrip
        movies={movies}
        activeId={movies[activeIndex]?.id}
        onSelectMovie={handleSelect}
        onEdit={setMovieToEdit}
        onDelete={handleDeleteMovie}
      />

      <div className="add-btn-wrapper">
        <button className="btn-add-movie" onClick={() => setShowAddForm(true)}>
          + Add Movie
        </button>
      </div>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onEdit={(movie) => {
            setMovieToEdit(movie)
            setSelectedMovie(null)
          }}
          onDelete={handleDeleteMovie}
        />
      )}

      {showAddForm && (
        <AddMovieForm
          onClose={() => setShowAddForm(false)}
          onAddMovie={handleAddMovie}
        />
      )}

      {movieToEdit && (
        <EditMovieForm
          movie={movieToEdit}
          onClose={() => setMovieToEdit(null)}
          onEditMovie={handleEditMovie}
        />
      )}
    </div>
  )
}

export default App