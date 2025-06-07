const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const SECRET = 'secretkey';

app.use(cors());
app.use(bodyParser.json());

let movies = [
  {
    id: 1,
    title: "Guardians of the Galaxy Vol. 2",
    poster: "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg",
    year: "2017",
    rated: "PG-13",
    released: "05 May 2017",
    runtime: "136 min",
    genre: "Action, Adventure, Comedy",
    director: "James Gunn",
    writer: "James Gunn, Dan Abnett, Andy Lanning",
    actors: "Chris Pratt, Zoe Saldaña, Dave Bautista",
    language: "English",
    country: "United States",
    awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total"
  },
  {
    id: 2,
    title: "Inception",
    poster: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
    year: "2010",
    rated: "PG-13",
    released: "16 Jul 2010",
    runtime: "148 min",
    genre: "Action, Adventure, Sci-Fi",
    director: "Christopher Nolan",
    writer: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    language: "English, Japanese, French",
    country: "United States, United Kingdom",
    awards: "Won 4 Oscars. 157 wins & 220 nominations total"
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    year: "2014",
    rated: "PG-13",
    released: "07 Nov 2014",
    runtime: "169 min",
    genre: "Adventure, Drama, Sci-Fi",
    director: "Christopher Nolan",
    writer: "Jonathan Nolan, Christopher Nolan",
    actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    language: "English",
    country: "United States, United Kingdom",
    awards: "Won 1 Oscar. 44 wins & 148 nominations total"
  },
  {
    id: 4,
    title: "The Matrix",
    poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
    year: "1999",
    rated: "R",
    released: "31 Mar 1999",
    runtime: "136 min",
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    writer: "Lana Wachowski, Lilly Wachowski",
    actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    language: "English",
    country: "United States",
    awards: "Won 4 Oscars. 37 wins & 51 nominations total"
  },
  {
    id: 5,
    title: "Fight Club",
    poster: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
    year: "1999",
    rated: "R",
    released: "15 Oct 1999",
    runtime: "139 min",
    genre: "Drama",
    director: "David Fincher",
    writer: "Chuck Palahniuk, Jim Uhls",
    actors: "Brad Pitt, Edward Norton, Meat Loaf",
    language: "English",
    country: "United States, Germany",
    awards: "Nominated for 1 Oscar. 11 wins & 38 nominations total"
  },
  {
    id: 6,
    title: "Pulp Fiction",
    poster: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
    year: "1994",
    rated: "R",
    released: "14 Oct 1994",
    runtime: "154 min",
    genre: "Crime, Drama",
    director: "Quentin Tarantino",
    writer: "Quentin Tarantino, Roger Avary",
    actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
    language: "English, French, Spanish",
    country: "United States",
    awards: "Won 1 Oscar. 69 wins & 75 nominations total"
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    poster: "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_.jpg",
    year: "1994",
    rated: "R",
    released: "14 Oct 1994",
    runtime: "142 min",
    genre: "Drama",
    director: "Frank Darabont",
    writer: "Stephen King, Frank Darabont",
    actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    language: "English",
    country: "United States",
    awards: "Nominated for 7 Oscars. 21 wins & 43 nominations total"
  },
  {
    id: 8,
    title: "The Avengers",
    poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    year: "2012",
    rated: "PG-13",
    released: "04 May 2012",
    runtime: "143 min",
    genre: "Action, Adventure, Sci-Fi",
    director: "Joss Whedon",
    writer: "Joss Whedon, Zak Penn",
    actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    language: "English",
    country: "United States",
    awards: "Nominated for 1 Oscar. 34 wins & 75 nominations total"
  }
];

let bookings = [];
let users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'user' },
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email: user.email, role: user.role }, SECRET);
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/movies', authenticate, authorize('admin'), (req, res) => {
  const { title, poster } = req.body;
  const newMovie = { id: Date.now(), title, poster: poster || "https://via.placeholder.com/200x300?text=No+Image" };
  movies.push(newMovie);
  res.json(newMovie);
});


function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role && req.user.role !== "admin") return res.sendStatus(403);
    next();
  };
}

// app.get('/api/movies', authenticate, (req, res) => {
//   res.json(movies);
// });
app.get('/api/movies', (req, res) => {
  res.json(movies);
});


app.get('/api/movies/:id', authenticate, (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
});

// app.post('/api/movies', authenticate, authorize('admin'), (req, res) => {
//   const newMovie = { id: Date.now(), title: req.body.title };
//   movies.push(newMovie);
//   res.json(newMovie);
// });


app.delete('/api/movies/:id', authenticate, authorize('admin'), (req, res) => {
  movies = movies.filter((m) => m.id !== parseInt(req.params.id));
  res.sendStatus(200);
});

app.post('/api/bookings', authenticate, authorize('user'), (req, res) => {
  const newBooking = {
    id: Date.now(),
    email: req.user.email,
    movieId: req.body.movieId,
    seats: req.body.seats,
    movieTitle: movies.find((m) => m.id === parseInt(req.body.movieId))?.title || '',
  };
  bookings.push(newBooking);
  res.json(newBooking);
});

app.get('/api/bookings', authenticate, authorize('user'), (req, res) => {
  const userBookings = bookings.filter((b) => b.email === req.user.email);
  res.json(userBookings);
});

app.delete('/api/bookings/:id', authenticate, authorize('user'), (req, res) => {
  bookings = bookings.filter((b) => b.id !== parseInt(req.params.id));
  res.sendStatus(200);
});


app.post('/api/movies', authenticate, authorize('admin'), (req, res) => {
  const {
    title, poster, year, rated, released, runtime,
    genre, director, writer, actors, language, country, awards
  } = req.body;

  const newMovie = {
    id: Date.now(),
    title,
    poster: poster || "https://via.placeholder.com/200x300?text=No+Image",
    year, rated, released, runtime,
    genre, director, writer, actors, language, country, awards
  };

  movies.push(newMovie);
  res.json(newMovie);
});

app.get('/api/admin/bookings', authenticate, authorize('admin'), (req, res) => {
  res.json(bookings);
});

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.post('/api/logout', (req, res) => {
  res.json({ message: "Logged out (frontend should discard token)" });
});

app.put('/api/bookings/:id', authenticate, authorize('user'), (req, res) => {
  const booking = bookings.find((b) => b.id === parseInt(req.params.id) && b.email === req.user.email);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  booking.seats = req.body.seats || booking.seats;
  res.json(booking);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));