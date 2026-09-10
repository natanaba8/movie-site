function Navbar({ onHomeClick, onWatchlistClick, watchlistCount }) {
  return (
    <header className="navbar">
      <div className="logo">Movie Site</div>

      <nav>
        <button onClick={onHomeClick}>Home</button>
        <button onClick={onWatchlistClick}>
          Watchlist <span id="watchlistCount">{watchlistCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
