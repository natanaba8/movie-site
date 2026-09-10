const API_KEY = "981f5905bf3f00e3193c963f238caa15";
const BASE_URL ="https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const homeBtn = document.getElementById("homeBtn");
const watchlistBtn = document.getElementById("watchlistBtn");
const sectionTitle = document.getElementById("sectionTitle");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const watchlistCount = document.getElementById("watchlistCount");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

async function getPopularMovies(){
    showLoading();
    try{
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        if(!response.ok){
            throw new Error("Movies is not Loading.");
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch(error){
        showError(error.message);
    } finally{
        hideLoading();
    }
}

async function searchMovies() {
    const query = searchInput.value.trim();

    if(query === ""){
        return;
    }
    
    showLoading();

    try{
        const reponse = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
        );

        if(!reponse.ok){
            throw new Error("Failed the Search.")
        }
        const data = await response.json();
        
        sectionTitle.textContent =
        `Result Search for "${query}"`;

        displayMovies(data.results);

    } catch (error){

    showError(error.message);

    } finally {
    
    hideLoading();
    
    }
    
}

function displayMovies(movies){
    movieContainer.innerHTML = "";
    errorMessage.textContent = "";

    if(movies.length === 0){
        movieContainer.innerHTML =
        `<div class="empty">
        <h3>Not Found the Movie.</h3>
        <p>Try searching for another movie</p>
        </div>`;

        return;
    }

    movies.forEach(function(movie){
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {

    const card = document.createElement("article");

    card.classList.add("movie-card");

    // Poster
    let poster = "";

    if (movie.poster_path) {
        poster = `${IMAGE_URL}${movie.poster_path}`;
    } else {
        poster = "https://via.placeholder.com/500x750?text=No+Poster";
    }

    // Year
    let year = "Unknown";

    if (movie.release_date) {
        year = movie.release_date.substring(0, 4);
    }

    // Watchlist
    const isInWatchlist =
        watchlist.some(item => item.id === movie.id);

    // Card HTML
    card.innerHTML = `
        <img
            src="${poster}"
            alt="${movie.title}"
            class="movie-poster"
        >

        <div class="movie-info">

            <h3 class="movie-title">
                ${movie.title}
            </h3>

            <p class="movie-year">
                ${year}
            </p>

            <p class="movie-rating">
                ${movie.vote_average.toFixed(1)}
            </p>

            <button
                class="watchlist-button"
                data-id="${movie.id}"
            >
                ${
                    isInWatchlist
                        ? "In Watchlist"
                        : "+ Add to Watchlist"
                }
            </button>

        </div>
    `;

    // Watchlist button
    const button =
        card.querySelector(".watchlist-button");

    button.addEventListener("click", function() {

        toggleWatchlist(movie);

        if (isMovieInWatchlist(movie.id)) {
            button.textContent = "In Watchlist";
        } else {
            button.textContent = "Add to Watchlist";
        }

    });

    // IMPORTANT: return at the END
    return card;
}

// const isInWatchlist =
// watchlist.some(item => item.id === movie.id);



// const button = card.querySelector(".watchlist-button");

// button.addEventListener(
//     "click",
//     function(){
//         toggleWatchlist(movie);

//         button.textContent = isMovieInWatchlist(movie.id)
//         ? "In Watchlist" :"Add to Watchlist";
//     }
// );

//return card;

function toggleWatchlist(movie){
    const exists = 
    watchlist.some(
        item => item.id === movie.id
    );

    if(exists){
        watchlist = 
        watchlist.filter(
            item => item.id !==movie.id
        );
    } else {
        watchlist.push(movie);
    }

    saveWatchlist();
    updateWatchlistCount();
}

function isMovieInWatchlist(movieId){
    return watchlist.some(
        movie => movie.id === movieId
    );
}

function saveWatchlist(){
    localStorage.setItem(
        "watchlist", JSON.stringify(watchlist)
    );
}

function updateWatchlistCount(){
    watchlistCount.textContent = watchlist.length;
}

function showWatchlist(){
    sectionTitle.textContent = "My Watchlist";
    displayMovies(watchlist);
}

function showLoading(){
    loading.style.display = "block";
    errorMessage.textContent = "";
}

function hideLoading(){
    loading.style.display = "none";
}

function showError(message){
    errorMessage.textContent = message;
    movieContainer.innerHTML = "";
}

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchMovies();
    }
});

homeBtn.addEventListener("click", 
    function(){
        sectionTitle.textContent = "Popular Movies";
        searchInput.value = "";
        getPopularMovies();
});

watchlistBtn.addEventListener("click", showWatchlist);

updateWatchlistCount();
getPopularMovies();

