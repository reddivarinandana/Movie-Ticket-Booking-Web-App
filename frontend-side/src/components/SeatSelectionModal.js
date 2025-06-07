import React from "react";

const SeatSelectionModal = ({
  movie,
  bookedSeats,
  selectedSeats,
  setSelectedSeats,
  onClose,
  onConfirm,
}) => {
  const seats = Array.from({ length: 40 }, (_, i) => i + 1); // 1 to 40

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Seats for {movie.title}</h2>
        <div className="seats-grid">
          {seats.map((seat) => (
            <div
              key={seat}
              className={`seat 
                ${bookedSeats.includes(seat) ? "booked" : ""}
                ${selectedSeats.includes(seat) ? "selected" : ""}
              `}
              onClick={() => toggleSeat(seat)}
            >
              {seat}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="confirm-booking" onClick={onConfirm}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;
