import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddMovieModal = ({ onClose, token, onMovieAdded }) => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async () => {
    if (!title || !poster || !year) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/movies",
        { title, poster, year },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Movie added!");
      onMovieAdded(res.data); // pass the new movie up
      onClose();
    } catch (error) {
      console.error("Add movie error:", error);
      toast.error("Failed to add movie");
    }
  };

  return (
    <div className="modal">
      <div className="modal-contents">
        <h3>Add New Movie</h3>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Movie</button>
          <button className="cancels-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
