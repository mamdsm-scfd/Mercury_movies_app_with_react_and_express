const BASE_URL = "http://localhost:3000";

const getMovies = async (search = "") => {
  const url = search
    ? `${BASE_URL}/movies?search=${search}`
    : `${BASE_URL}/movies?limit=30`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

const getMovieById = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  if (!res.ok) throw new Error("Movie not found");
  return res.json();
};

const addMovie = async (movieData) => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Failed to add movie");
  return res.json();
};

const updateMovie = async (id, movieData) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Failed to update movie");
  return res.json();
};

const deleteMovie = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete movie");
  return res.json();
};

export { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };
