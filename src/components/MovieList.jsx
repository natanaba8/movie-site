import MovieCard from "./MovieCard.jsx";

function MovieList({ movies, watchlist, onToggleWatchlist }) {
  if (movies.length === 0) {
    return (
      <div className="empty">
        <h3>No movies found.</h3>
        <p>Try searching for another movie</p>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={watchlist.some((item) => item.id === movie.id)}
          onToggleWatchlist={onToggleWatchlist}
        />
      ))}
    </section>
  );
}

export default MovieList;
