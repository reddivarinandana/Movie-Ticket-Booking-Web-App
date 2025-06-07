import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminDashboard from "./components/AdminDashBoard";
import UserDashboard from "./components/UserDashBoard";
import MovieDetails from "./components/MovieDetails";
import LoginModal from "./components/LoginForm";
import MovieGrid from "./components/MovieGrid";
import BookingHistory from "./components/BookingHistory";
import AddMovieModal from "./components/AddMovieModal";
import SeatSelectionModal from "./components/SeatSelectionModal";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const profileMenuRef = useRef();
  const toastShownRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      setToken(res.data.token);
      setRole(res.data.role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success("Login successful!");
      setShowLoginModal(false);
      setShowProfileMenu(false);
      fetchMovies(res.data.token);
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  const handleLogout = () => {
    setToken("");
    setRole("");
    setEmail("");
    setPassword("");
    localStorage.clear();
    toast.info("Logged out!");
  };

  const fetchMovies = async (authToken) => {
    try {
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const res = await axios.get("http://localhost:5000/api/movies", { headers });
      setMovies(res.data);
    } catch (error) {
      toast.error("Failed to fetch movies.");
    }
  };

  const fetchBookedSeats = async (movieId) => {
    if (!token) {
      toast.error("Login required to view booked seats.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookedSeats(res.data.bookedSeats || []);
    } catch (error) {
      console.error("Fetch booked seats error:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      fetchMovies(storedToken);
    } else {
      fetchMovies();
    }
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.trim() && filteredMovies.length === 0) {
      if (!toastShownRef.current) {
        toast.warning("Movie not found!");
        toastShownRef.current = true;
      }
    } else {
      toastShownRef.current = false;
    }
  }, [searchTerm, filteredMovies]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Movie deleted");
      setMovies(movies.filter((m) => m.id !== id));
      setSelectedMovie(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const bookSeats = async () => {
    if (!selectedSeats.length) return toast.warning("Please select seats!");
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { movieId: selectedMovie.id, seats: selectedSeats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Booking successful!");
      setSelectedMovie(null);
      setSelectedSeats([]);
      setShowSeatSelection(false);
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">🎬 MyMovieApp</div>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />
        {!token ? (
          <button className="login-btn" onClick={() => setShowLoginModal(true)}>Login</button>
        ) : (
          <div className="profile-wrapper" ref={profileMenuRef}>
            <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="profile-icon">
              👤 {role}
            </div>
            {showProfileMenu && (
              <div className="profile-popup">
                {role === "user" && (
                  <>
                    <button onClick={() => setSelectedTab("history")}>📜 Booking History</button>
                    <button onClick={handleLogout}>🚪 Logout</button>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <button onClick={() => setSelectedTab("addMovie")}>🎬 Add Movie</button>
                    <button onClick={handleLogout}>🚪 Logout</button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {token && role === "admin" && <AdminDashboard token={token} />}
      {token && role === "user" && <UserDashboard token={token} />}

      {selectedTab === "history" && role === "user" && (
        <BookingHistory token={token} onClose={() => setSelectedTab("")} />
      )}

      {selectedTab === "addMovie" && role === "admin" && (
        <AddMovieModal
          token={token}
          onClose={() => setSelectedTab("")}
          onMovieAdded={(newMovie) => setMovies([...movies, newMovie])}
        />
      )}

      {selectedMovie && showSeatSelection && (
        <SeatSelectionModal
          movie={selectedMovie}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          onClose={() => setShowSeatSelection(false)}
          onConfirm={bookSeats}
        />
      )}

      {selectedMovie && !showSeatSelection && (
        <MovieDetails
          movie={selectedMovie}
          token={token}
          role={role}
          bookedSeats={bookedSeats}
          fetchBookedSeats={fetchBookedSeats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          setShowSeatSelection={setShowSeatSelection}
          deleteMovie={handleDelete}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {showLoginModal && (
        <LoginModal
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onLogin={login}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      <MovieGrid
        movies={filteredMovies}
        onSelectMovie={(movie) => {
          setSelectedMovie(movie);
          if (token) {
            fetchBookedSeats(movie.id);
          } else {
            setBookedSeats([]); 
          }
        }}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
