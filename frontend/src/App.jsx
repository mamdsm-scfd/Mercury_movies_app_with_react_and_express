import Navbar from './components/Navbar'
import Hero from './components/Hero'
import movies from './mockData'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Hero 
        movie={movies[0]} 
        onPrev={() => console.log("prev")}
        onNext={() => console.log("next")}
      />
    </div>
  )
}

export default App