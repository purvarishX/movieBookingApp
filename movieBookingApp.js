var movieList = [];
var shows = [];
var newMovie = {
    movie: '',
    desc: '',
    rate: '',
    shows: []
};

loadExistingMovies(); // Load existing movies from local storage when the page loads

function loadExistingMovies() {
    var exisitingMovies = localStorage.getItem("movieList");
    if (exisitingMovies) {
        movieList = JSON.parse(exisitingMovies);
        console.log("EXISTING MOVIES: ", movieList);
        document.getElementById("movieDisplayContainer").style.display = "block";
        displayMovies();
    } else {
        document.getElementById("movieDisplayContainer").style.display = "none";
    }
}

function displayMovies() {
    for (var i = 0; i < movieList.length; i++) {
        var parentDiv = document.createElement("div");
        parentDiv.className = "col-12 col-md-6 col-xl-4 mt-4";
        var movieCard = `<div class="card movie-card glass-card delay-1">
                            <div class="card-header">${movieList[i].movie}</div>
                            <div class="card-body">
                                <p class="text-muted">${movieList[i].desc}
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="price-tag">Rs. ${movieList[i].rate}</span>
                                </div>
                                <div class="pill-time mt-3 d-flex flex-wrap gap-2 p-0 border-0">
                                    ${movieList[i].shows.map(show => `<span class="badge rounded-pill bg-secondary">${show}</span>`).join('')}
                                </div>
                                <div class="mt-4 d-flex flex-column flex-md-row gap-3">
                                    <button class="btn btn-brand">Book Seat</button>
                                </div>
                            </div>
                        </div>`;

        parentDiv.innerHTML = movieCard;
        console.log("PARENT DIV: ", document.getElementById("trendingMovies"));
        document.getElementById("trendingMovies").append(parentDiv);
    }
}

//  Function to add a new movie to the movie list and save it to local storage
function addMovie() {
    if (movieList.find(movieElement => movieElement.movie !== getElementByIdFunc("movie").value.toLowerCase()) && movieList.length < 6) {
        newMovie.movie = getElementByIdFunc("movie").value;
        newMovie.desc = getElementByIdFunc("desc").value;
        newMovie.rate = getElementByIdFunc("rate").value;
        movieList.push(newMovie);
        console.log("MOVIE LIST: ", movieList);
        localStorage.setItem("movieList", JSON.stringify(movieList));
        emptyAddMovieForm();
    } else {
        if (movieList.length >= 6) {
            alert("Movie limit reached! Cannot add more than 6 movies.");
        } else {
            alert("Movie already exists!");
        }
        emptyAddMovieForm();
    }
}

// Function to clear the add movie form and reset the newMovie object
emptyAddMovieForm = () => {
    newMovie = {
        movie: '',
        desc: '',
        rate: '',
        shows: []
    };
    getElementByIdFunc("movie").value = '';
    getElementByIdFunc("desc").value = '';
    getElementByIdFunc("rate").value = '';
    let showCheckboxes = document.querySelectorAll(".pill-time .form-check-input");
    showCheckboxes.forEach(checkbox => checkbox.checked = false);
}

// Function to add or remove show times from the newMovie object based on checkbox state
function addShows(event, time) {
    if (event.target.checked) {
        newMovie.shows.push(time);
    } else {
        newMovie.shows = newMovie.shows.filter(showTime => showTime !== time);
    }
    //console.log("SHOWS: ", newMovie.shows);
}

// Utility function to get an element by its ID
function getElementByIdFunc(id) {
    return document.getElementById(id);
}