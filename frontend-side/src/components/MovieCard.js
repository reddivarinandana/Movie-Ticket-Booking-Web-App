import React from "react";

const MovieCard = ({ movie, role, selectMovie, deleteMovie, setSeats, bookSeats }) => (
  <div className="movie-card">
    <img src={movie.poster} alt="Poster" className="movie-poster" />
    <h4>{movie.title}</h4>
    <button onClick={() => selectMovie(movie.id)}>Details</button>
    {role === "admin" && (
      <button onClick={() => deleteMovie(movie.id)} className="delete-btn">
        Delete
      </button>
    )}
    {role === "user" && (
      <>
        <input
          placeholder="Seats (e.g. A1,A2)"
          onChange={(e) => setSeats(e.target.value.split(","))}
          className="input"
        />
        <button onClick={bookSeats}>Book</button>
      </>
    )}
  </div>
);

export default MovieCard;