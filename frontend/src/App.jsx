import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MoviesStrip from './components/MoviesStrip'
import mockData from './mockData'
import './App.css'

function App() {
  const [movies] = useState(mockData)
  const [activeIndex, setActiveIndex] = useState(0)
  const [search, setSearch] = useState('')

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

  return (
    <div className="app">
      <Navbar onSearch={setSearch} />
      <Hero
        movie={filteredMovies[activeIndex]}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <MoviesStrip
        movies={filteredMovies}
        activeId={filteredMovies[activeIndex]?.id}
        onSelectMovie={handleSelect}
      />
    </div>
  )
}

export default App