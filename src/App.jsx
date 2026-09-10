import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MovieList from "./components/MovieList.jsx";

const API_KEY = "981f5905bf3f00e3193c963f238caa15";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState([]);
  // Start the watchlist with whatever was saved in localStorage before
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [sectionTitle, setSectionTitle] = useState("Popular Movies");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load the popular movies when the page opens
  useEffect(() => {
    getPopularMovies();
  }, []);

  async function getPopularMovies() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("Movies are not loading.");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setErrorMessage(error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function searchMovies() {
    const query = searchText.trim();

    if (query === "") {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("The search failed.");
      }

      const data = await response.json();
      setSectionTitle(`Search results for "${query}"`);
      setMovies(data.results);
    } catch (error) {
      setErrorMessage(error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function toggleWatchlist(movie) {
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
    let newWatchlist;

    if (isInWatchlist) {
      newWatchlist = watchlist.filter((item) => item.id !== movie.id);
    } else {
      newWatchlist = [...watchlist, movie];
    }

    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));

    // Keep the watchlist page in sync while the user is looking at it
    if (sectionTitle === "My Watchlist") {
      setMovies(newWatchlist);
    }
  }

  function showHome() {
    setSectionTitle("Popular Movies");
    setSearchText("");
    getPopularMovies();
  }

  function showWatchlist() {
    setSectionTitle("My Watchlist");
    setErrorMessage("");
    setMovies(watchlist);
  }

  return (
    <>
      <Navbar
        onHomeClick={showHome}
        onWatchlistClick={showWatchlist}
        watchlistCount={watchlist.length}
      />

      <Hero
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSearch={searchMovies}
      />

      <main>
        <div className="section-header">
          <h2>{sectionTitle}</h2>
        </div>

        {loading && <div className="loading">Loading movies...</div>}

        {errorMessage && <div className="error">{errorMessage}</div>}

        {!loading && !errorMessage && (
          <MovieList
            movies={movies}
            watchlist={watchlist}
            onToggleWatchlist={toggleWatchlist}
          />
        )}
      </main>
    </>
  );
}

export default App;
