const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const NO_POSTER = "https://placehold.co/500x750?text=No+Poster";

function MovieCard({ movie, isInWatchlist, onToggleWatchlist }) {
  // Some movies have no poster or no release date
  const poster = movie.poster_path ? IMAGE_URL + movie.poster_path : NO_POSTER;
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "Unknown";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <article className="movie-card">
      <img src={poster} alt={movie.title} className="movie-poster" />

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{year}</p>
        <p className="movie-rating">Rating: {rating}</p>

        <button
          className="watchlist-button"
          onClick={() => onToggleWatchlist(movie)}
        >
          {isInWatchlist ? "In Watchlist" : "+ Add to Watchlist"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
