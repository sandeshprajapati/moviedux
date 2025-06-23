import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function WatchList({ watchlist, movies, toggleWatchList }) {
  return (
    <div>
      <h1 className="title">Your WatchList</h1>
      <div className="watchlist">
        {watchlist.map((id) => {
          const movie = movies.find((movie) => movie.id === id);
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleWatchList={toggleWatchList}
              isWatchListed={true}
            />
          );
        })}
      </div>
    </div>
  );
}
