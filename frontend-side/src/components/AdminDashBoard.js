import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = ({ token }) => {
  const [movie, setMovie] = useState({ title: "", poster: "" });

  const addMovie = async () => {
    try {
      await axios.post("http://localhost:5000/api/movies", movie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Movie added!");
      setMovie({ title: "", poster: "" });
    } catch {
      toast.error("Failed to add movie");
    }
  };

  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      {/* <input placeholder="Title" value={movie.title} onChange={(e) => setMovie({ ...movie, title: e.target.value })} /> */}
      {/* <input placeholder="Poster URL" value={movie.poster} onChange={(e) => setMovie({ ...movie, poster: e.target.value })} /> */}
      {/* <button onClick={addMovie}>Add Movie</button> */}
    </div>
  );
};

export default AdminDashboard;
