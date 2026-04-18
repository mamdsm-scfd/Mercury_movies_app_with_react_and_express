# 🎬 Mercury Movies App(Mercury_movies_app)

A full-stack movies application built with **React.js** (frontend) and **Express.js** (backend).

---

## 👥 Team Members

| Name | Role |
|------|------|
| [Mahmoud Dohair] | Frontend Developer |
| [Mohammed Ferwana] | Backend Developer |

---

## 🚀 How to Run

### Prerequisites
- Node.js installed
- Two terminal windows open

### Backend

```bash
cd backend
npm install
node server
```

Server runs on: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on: `http://localhost:5173`

> ⚠️ Make sure the backend is running **before** starting the frontend.

---

## ✨ Features

### Frontend
| Feature | Status | Related Issues & PRs |
|---------|--------|----------------------|
| Movie list (MoviesStrip) | ✅ Done | |
| Movie details view (MovieDetails) | ✅ Done | |
| Search functionality | ✅ Done | |
| Carousel / Hero section | ✅ Done | |
| Add movie form | ✅ Done | |
| Edit movie form | ✅ Done | |
| Delete movie | ✅ Done | |
| Loading & error states | ✅ Done | |

### Backend
| Endpoint | Method | Description | Status |
|----------|--------|-------------|--------|
| `/movies` | GET | Get all movies | ✅ Done |
| `/movies?search=batman` | GET | Search movies by title | ✅ Done |
| `/movies?limit=20` | GET | Limit number of results | ✅ Done |
| `/movies/:id` | GET | Get movie by ID | ✅ Done |
| `/movies` | POST | Add new movie | ✅ Done |
| `/movies/:id` | PATCH | Update movie | ✅ Done |
| `/movies/:id` | DELETE | Delete movie | ✅ Done |

---

## 🗂️ Project Structure

```
mercury_movies_app_with_react_and_express/
│
├── backend/
│   ├── data/
│   │   └── movies-db.json       # Movies database (JSON file)
│   ├── routes/
│   │   └── movieRoutes.js       # All API routes
│   ├── app.js                   # Express app setup + middleware
│   └── server.js                # Server entry point (port 3000)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation + search bar
│   │   │   ├── Hero.jsx          # Featured movie carousel
│   │   │   ├── MoviesStrip.jsx   # Horizontal movies list
│   │   │   ├── MovieCard.jsx     # Single movie card
│   │   │   ├── MovieDetails.jsx  # Movie details modal
│   │   │   ├── AddMovieForm.jsx  # Add new movie form
│   │   │   └── EditMovieForm.jsx # Edit existing movie form
│   │   ├── services/
│   │   │   └── api.js            # All API calls (fetch)
│   │   ├── App.jsx               # Main app component + state
│   │   └── App.css               # Global styles
│   └── index.html
│
└── README.md
```

---

## 🔌 API Documentation

A full Postman collection is included in the repository: `Movies_App_API.postman_collection.json`

Import it in Postman to test all endpoints directly.

**Base URL:** `http://localhost:3000`

### Example Requests

**Get all movies:**
```
GET http://localhost:3000/movies
```

**Search:**
```
GET http://localhost:3000/movies?search=inception
```

**Get by ID:**
```
GET http://localhost:3000/movies/27205
```

**Add movie:**
```
POST http://localhost:3000/movies
Content-Type: application/json

{
  "title": "New Movie",
  "overview": "A great movie",
  "genres": "Action",
  "release_date": "2024-01-01",
  "vote_average": 8.0,
  "runtime": 120
}
```

**Update movie:**
```
PATCH http://localhost:3000/movies/27205
Content-Type: application/json

{
  "vote_average": 9.0
}
```

**Delete movie:**
```
DELETE http://localhost:3000/movies/27205
```

---

## 💡 Assumptions

- Movie poster and backdrop images are fetched from [TMDB](https://www.themoviedb.org/) using the path stored in `movies-db.json`
- The app uses a local JSON file as a database (no external database required)
- Search is case-insensitive and filters by movie title only
- The frontend runs with mock data during development before connecting to the backend

---

## ⚠️ Known Limitations

- Data is stored in a JSON file — not a real database, so concurrent writes could cause issues
- No authentication or authorization
- No pagination (uses `?limit=20` by default)
- Images require a working internet connection (loaded from TMDB CDN)

---

## 📈 Progress

### Week 2 Checklist
- [x] React frontend setup with Vite
- [x] Express backend with REST API
- [x] All CRUD operations connected (frontend ↔ backend)
- [x] Search functionality (debounced)
- [x] GitHub workflow with issues, branches, and PRs
- [x] Postman collection documented
- [x] README completed

---

## 🧗 Challenges

### Individual Challenges

**Frontend (Mahmoud Dohair):**
- Learning React hooks (`useState`, `useEffect`) from scratch during the week
- Connecting the frontend to the backend (CORS, async fetch)
- Handling image paths from TMDB API

**Backend (Mohammed Ferwana ):**
- Structuring Express routes properly
- Handling file read/write with `fs` module asynchronously
- Testing all endpoints with Postman

### Team Challenges
- Coordinating work in parallel (frontend used mock data while backend was being built)
- Merging branches without conflicts
- Ensuring the API response shape matched what the frontend expected

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.x",
  "cors": "^2.x"
}
```

### Frontend
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "vite": "^5.x"
}
```