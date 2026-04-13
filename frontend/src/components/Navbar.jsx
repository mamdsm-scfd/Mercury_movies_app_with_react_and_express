import './Navbar.css'

function Navbar({onSearch}) {
  
  return (
    <nav className="navbar">
      <h1 className="navbarLogo">New <span>MOVIES</span></h1>
      <div className="navbarSearch">
        <span className="searchIcon">&#128269;</span>
        <input type="text" placeholder="Search movies..." onChange ={(e) => onSearch(e.target.value)} />
      </div>
    </nav>
  );
}

export default Navbar;
