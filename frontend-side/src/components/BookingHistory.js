import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingHistory = ({ token, onClose }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch booking history.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted");
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      toast.error("Failed to delete booking.");
    }
  };

  return (
    <div className="booking-history">
      <div className="booking-history-header">
        <h3>🎟️ Booking History</h3>
        <button onClick={onClose}>✖</button>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="booking-entry">
            🎬 <strong>{b.movieTitle}</strong> | Seats: {b.seats.join(", ")}
            <button onClick={() => handleDelete(b.id)}>🗑 Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingHistory;
