import React from "react";

const MovieGrid = ({ movies, onSelectMovie }) => {
  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <p className="no-movies-message">🎬 Movie not found. Please try another title.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => onSelectMovie(movie)}>
            <img src={movie.poster} alt={movie.title} className="poster" />
            <h4>{movie.title}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieGrid;
