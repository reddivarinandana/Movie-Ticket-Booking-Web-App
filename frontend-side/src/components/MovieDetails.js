import React from "react";
import { toast } from "react-toastify";

const MovieDetails = ({
  movie,
  token,
  role,
  bookedSeats,
  fetchBookedSeats,
  selectedSeats,
  setSelectedSeats,
  showSeatSelection,
  setShowSeatSelection,
  bookSeats,
  deleteMovie,
  onClose,
}) => {
  const seatsList = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

  const handleBookClick = async () => {
    if (!token) {
      toast.error("Please login to book tickets.");
      return;
    }

    // Only fetch booked seats when needed
    await fetchBookedSeats(movie.id);
    setSelectedSeats([]);
    setShowSeatSelection(true);
  };

  return (
    <div className="movie-tab">
      <div className="tab-header">
        <h3>{movie.title}</h3>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>

      <div className="tab-content">
        <img src={movie.poster} alt="Poster" className="tab-poster" />
        <div className="tab-details">
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> {movie.rated}</p>
          <p><strong>Released:</strong> {movie.released}</p>
          <p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Writer:</strong> {movie.writer}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p><strong>Awards:</strong> {movie.awards}</p>

          <div className="booking-section">
            {!showSeatSelection ? (
              <button className="book-button" onClick={handleBookClick}>
                🎟 Book Ticket
              </button>
            ) : (
              <>
                <h4>Select Your Seats:</h4>
                <div className="seats-grid">
                  {seatsList.map((seat) => (
                    <button
                      key={seat}
                      className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
                      disabled={bookedSeats.includes(seat)}
                      onClick={() => {
                        if (bookedSeats.includes(seat)) return;
                        setSelectedSeats((prev) =>
                          prev.includes(seat)
                            ? prev.filter((s) => s !== seat)
                            : [...prev, seat]
                        );
                      }}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
                <button className="book-button" onClick={bookSeats}>
                  ✅ Confirm Booking
                </button>
                <button
                  className="book-button cancel-btn"
                  onClick={() => {
                    setShowSeatSelection(false);
                    setSelectedSeats([]);
                  }}
                >
                  ❌ Cancel
                </button>
              </>
            )}
          </div>

          {role === "admin" && (
            <button className="book-button delete-btn" onClick={() => deleteMovie(movie.id)}>
              🗑 Delete Movie
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
