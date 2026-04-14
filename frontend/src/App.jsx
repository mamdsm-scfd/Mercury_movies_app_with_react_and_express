import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MoviesStrip from './components/MoviesStrip'
import AddMovieForm from './components/AddMovieForm'
import mockData from './mockData'
import './App.css'

function App() {
  const [movies, setMovies] = useState(mockData)
  const [activeIndex, setActiveIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  const handlePrev = () => {
    setActiveIndex(i => (i === 0 ? filteredMovies.length - 1 : i - 1))
  }

  const handleNext = () => {
    setActiveIndex(i => (i === filteredMovies.length - 1 ? 0 : i + 1))
  }

  const handleSelect = (movie) => {
    const index = filteredMovies.findIndex(m => m.id === movie.id)
    setActiveIndex(index)
  }

  const handleAddMovie = (newMovie) => {
    setMovies(prev => [...prev, newMovie])
    setActiveIndex(movies.length)
  }

  return (
    <div className="app">
      <Navbar onSearch={setSearch} />

      <Hero
        movie={filteredMovies[activeIndex]}
        onPrev={handlePrev}
        onNext={handleNext}
        onDetailsClick={() => setSelectedMovie(filteredMovies[activeIndex])}
      />

      <MoviesStrip
        movies={filteredMovies}
        activeId={filteredMovies[activeIndex]?.id}
        onSelectMovie={handleSelect}
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
        />
      )}

      {showAddForm && (
        <AddMovieForm
          onClose={() => setShowAddForm(false)}
          onAddMovie={handleAddMovie}
        />
      )}
    </div>
  )
}

export default App