function Hero({ searchText, onSearchTextChange, onSearch }) {
  // Let the user search by pressing Enter too
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Your Next Movie</h1>
        <p>Search for a movie and save your favorites to your watchlist.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
