import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("All Genre");

  const [rating, setRating] = useState("All");

  const genreOption = ["All Genre", "Action", "Drama", "Fantasy", "Horror"];
  const ratingOption = ["All", "Good", "Ok", "Bad"];

  useEffect(() => {
    fetch("movies.json")
      .then((reponse) => reponse.json())
      .then((data) => setMovies(data));
  }, []);

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genre" || movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const matchSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
  const filterMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchSearchTerm(movie, searchTerm) &&
      matchesRating(movie, rating)
  );

  const hadndleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movie.."
        className="search-input"
        value={searchTerm}
        onChange={hadndleSearchTerm}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            {genreOption.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            {ratingOption.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filterMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
}
