var movieList = [];
var shows = [];
var newMovie = {
    movie: '',
    desc: '',
    rate: '',
    shows: []
};
var newBooking = {
    customerName: '',
    phoneNumber: '',
    email: '',
    movieSelected: '',
    showTimeSelected: '',
    seatsSelected: 0,
};
var finalAmount = 0;

loadExistingMovies(); // Load existing movies from local storage when the page loads

function loadExistingMovies() {
    emptyAddMovieForm();
    var exisitingMovies = localStorage.getItem("movieList");
    if (exisitingMovies) {
        movieList = JSON.parse(exisitingMovies);
        document.getElementById("movieDisplayContainer").style.display = "block";
        displayMovies();
        if (movieList.length > 0) {
            addMoviesToDropdown();
            emptyBookingForm();
            getElementByIdFunc("bookingSummary").style.display = 'none';
        }
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
                                    <!-- ${getSpanShows(movieList[i].shows)} -->
                                </div>
                                <div class="mt-4 d-flex flex-column flex-md-row gap-3">
                                    <button class="btn btn-brand btn-book-seat">Book Seat</button>
                                </div>
                            </div>
                        </div>`;

        parentDiv.innerHTML = movieCard;
        console.log("PARENT DIV: ", document.getElementById("trendingMovies"));
        document.getElementById("trendingMovies").append(parentDiv);
    }
}

function getSpanShows(shows) {
    var spanList = '';
    shows.forEach(show => {
        var span = `<span class="badge rounded-pill bg-secondary"> ${show} </span>`;
        spanList += span;
    });
    return spanList;
}

// function bookSeatClicked(event) {
//     console.log("BOOK SEAT BUTTON CLICKED: ", event.target.value);
// }

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
        } else if (movieList.find(movieElement => movieElement.movie !== getElementByIdFunc("movie").value.toLowerCase())) {
            alert("Movie already exists!");
        } else if (getElementByIdFunc("movie").value === '' || getElementByIdFunc("desc").value === '' || getElementByIdFunc("rate").value === '') {
            alert("Enter all movie details to add movie!");
        }
        emptyAddMovieForm();
    }

    if (movieList.length > 0) {
        addMoviesToDropdown();
    }
}

// Function to clear the add movie form and reset the newMovie object
function emptyAddMovieForm() {
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

function emptyBookingForm() {
    newBooking = {
        customerName: '',
        phoneNumber: '',
        email: '',
        movieSelected: '',
        showTimeSelected: '',
        seatsSelected: ''
    };
    getElementByIdFunc("customerName").value = '';
    getElementByIdFunc("phoneNumber").value = '';
    getElementByIdFunc("email").value = '';
    getElementByIdFunc("movieOptions").value = '';
    getElementByIdFunc("showtimeOptions").value = '';
    getElementByIdFunc("seats").value = 0;
}

// Function to add or remove show times from the newMovie object based on checkbox state
function addShows(event, time) {
    if (event.target.checked) {
        newMovie.shows.push(time);
    } else {
        newMovie.shows = newMovie.shows.filter(showTime => showTime !== time);
    }
}

function addMoviesToDropdown() {
    document.getElementById("movieOptions").innerHTML = ""; // Reset dropdown options   
    movieList.forEach(movieElement => {
        var option = document.createElement("option");
        option.innerText = movieElement.movie;
        document.getElementById("movieOptions").append(option);
    });
}

function populateShowtimes() {
    var selectedMovie = document.getElementById("movieOptions").value; // Reset showtime options
    var shows = movieList.find(movieEle => movieEle.movie === selectedMovie)?.shows || [];
    document.getElementById("showtimeOptions").innerHTML = ""; // Reset showtime options
    shows.forEach(showTime => {
        var showTimeOption = document.createElement("option");
        showTimeOption.innerText = showTime;
        document.getElementById("showtimeOptions").append(showTimeOption);
    });
}

function bookTickets() {
    newBooking.customerName = getElementByIdFunc("customerName").value;
    newBooking.phoneNumber = getElementByIdFunc("phoneNumber").value;
    newBooking.email = getElementByIdFunc("email").value;
    newBooking.movieSelected = getElementByIdFunc("movieOptions").value;
    newBooking.showTimeSelected = getElementByIdFunc("showtimeOptions").value;
    newBooking.seatsSelected = getElementByIdFunc("seats").value;
    if (newBooking.customerName === '' || newBooking.phoneNumber === '' || newBooking.email === '' || newBooking.movieSelected === '' || newBooking.showTimeSelected === '' || newBooking.seatsSelected <= 0) {
        alert("Please fill in all booking details and select at least 1 seat to proceed with booking.");
    } else {
        finalAmount = newBooking.seatsSelected * movieList.find(movie => movie.movie === newBooking.movieSelected).rate;
        getElementByIdFunc("finalMovie").innerText = newBooking.movieSelected;
        getElementByIdFunc("finalShowtime").innerText = newBooking.showTimeSelected;
        getElementByIdFunc("finalSeats").innerText = `${newBooking.seatsSelected} Tickets`;
        getElementByIdFunc("finalAmount").innerText = `Rs. ${finalAmount}`;
        getElementByIdFunc("bookingSummary").style.display = 'block';
    }
}

function resetBooking() {
    emptyBookingForm();
    getElementByIdFunc("bookingSummary").style.display = 'none';
}

// Utility function to get an element by its ID
function getElementByIdFunc(id) {
    return document.getElementById(id);
}