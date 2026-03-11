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
        displayMovies();
    }
}

function displayMovies() {
    for (var i = 0; i < movieList.length; i++) {
        var parentDiv = document.createElement("div");
        var movieCard = `<div class="col-12 col-md-6 col-xl-4">
                        <div class="card movie-card glass-card delay-1">
                            <div class="card-header">${movieList[i].movie}</div>
                            <div class="card-body">
                                <p class="text-muted">${movieList[i].desc}
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="price-tag">Rs. ${movieList[i].rate}</span>
                                </div>
                                <div class="mt-4 d-flex flex-column flex-md-row gap-3">
                                    <button class="btn btn-brand" fdprocessedid="fytd4r">Book Seat</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

        parentDiv.innerHTML = movieCard;
        getElementByIdFunc("trendingMovies").append(parentDiv);
    }

}

//  Function to add a new movie to the movie list and save it to local storage
function addMovie() {
    newMovie.movie = getElementByIdFunc("movie").value;
    newMovie.desc = getElementByIdFunc("desc").value;
    newMovie.rate = getElementByIdFunc("rate").value;
    movieList.push(newMovie);
    console.log("MOVIE LIST: ", movieList);
    localStorage.setItem("movieList", JSON.stringify(movieList));
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


function getElementByIdFunc(id) {
    return document.getElementById(id);
}