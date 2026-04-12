let app = require("express");
let router = app.Router();
const fs = require("fs");
const path = require("path");

const moviesPath = path.join(__dirname, "../data", "movies-db.json");

router.get("/", (req, res) => {
  fs.readFile(moviesPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    let movies = JSON.parse(data);
    const { search, limit } = req.query;

    if (search) {
      movies = movies.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (limit) {
      movies = movies.slice(0, parseInt(limit));
    }

    res.json(movies);
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(moviesPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    const movies = JSON.parse(data);
    const movie = movies.find((m) => m.id === parseInt(req.params.id));

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  });
});

router.post("/", (req, res) => {
  fs.readFile(moviesPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    const movies = JSON.parse(data);
    const newMovie = {
      id: Date.now(),
      ...req.body,
    };

    movies.push(newMovie);

    fs.writeFile(moviesPath, JSON.stringify(movies, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving data" });
      res.status(201).json(newMovie);
    });
  });
});
module.exports = router;
