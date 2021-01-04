var key = "AIzaSyDTBCUxVbL39WQeQqdnu6uFJ5t5a2989_s";

var queryURL = "https://www.googleapis.com/books/v1/volumes?q=";
var queryURL3 = "https://www.omdbapi.com/?s=";
var key3 = "&apikey=trilogy";
var movieTitle = "";
/**checks cocal storage, and if empty sets listsObj */
function checkStorage() {
  const lists = {
    books: [],
    movies: [],
    videoGames: [],
  };
  if (localStorage.getItem("listsObj") === null) {
    localStorage.setItem("listsObj", JSON.stringify(lists));
  }
}
/**reads from listsObj local storage
 * @returns {object} object information from listsObj loacal storage
 */
function localRead() {
  return JSON.parse(localStorage.getItem("listsObj"));
}
/**sets an item to local storage
 * @param {object}
 */
function localWrite(data) {
  localStorage.setItem("listsObj", JSON.stringify(data));
}
function displayBooks() {
  var search = $("#search").val();
  // Creates AJAX call for google books api
  $.ajax({
    url: queryURL + search,
    method: "GET",
  }).then(function (response) {
    console.log("books", response);
    // console.log(response.items.length);
    $("#newResult").empty();
    response.items.forEach(function (value, index) {
      displayCards(value, index);
    });
    $(".save1").on("click", function () {
      var myLists = localRead();
      var newSave = response.items[$(this).attr("data-id")].volumeInfo;
      var saveBook = {
        title: newSave.title,
        authors: newSave.authors,
        imageLinks: newSave.imageLinks,
      };
      console.log("this is the saved book", saveBook);

      myLists.books.push(saveBook);

      localWrite(myLists);
    });
  });
}
function displayGames() {
  var search = $("#search").val().trim();
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://rawg-video-games-database.p.rapidapi.com/games?search=" + search,
    method: "GET",
    headers: {
      "x-rapidapi-key": "a688fc83bamsh46670efb1f6f6d4p1aabd2jsncc1d3e1bf328",
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    },
  };

  $.ajax(settings).then(function (response) {
    console.log(response);
    $("#newResult").empty();
    response.results.forEach(function (value, index) {
      displayGameCards(value, index);
    });
    $(".save1").on("click", function () {
      var myLists = localRead();
      var newSave = response.results[$(this).attr("data-id")];
      console.log(myLists);
      var saveGame = {
        title: newSave.name,
        rating: "Rating is: " + newSave.rating + " out of " + newSave.rating_top,
        imageLinks: newSave.background_image,
      };
      console.log(saveGame);
      console.log("this is the saved game", saveGame);
      myLists.videoGames.push(saveGame);

      localWrite(myLists);
    });
  });
}

// Function to search for movies

function displayMovies() {
  movieTitle = $("#search").val().trim();
  // console.log($("#search").val().trim());

  //Executes search command
  $.ajax({
    url: queryURL3 + movieTitle + key3,
    method: "GET",
  }).then(function (response) {
    $("#newResult").empty();
    response.Search.forEach(function (value, index) {
      displayMovieCards(value, index);
    });
    $(".save1").on("click", function () {
      var myLists = localRead();

      var newSave = response.Search[$(this).attr("data-id")];
      var saveMovie = {
        title: newSave.Title,
        // authors: newSave.authors,
        imageLinks: newSave.Poster,
      };
      console.log("this is the saved Movie", saveMovie);
      myLists.movies.push(saveMovie);

      localWrite(myLists);
    });
  });
}
// function to create cards for books
function displayCards(cardInfo, id) {
  // console.log(cardInfo);
  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="bookImg" src="${
    cardInfo.volumeInfo.imageLinks ? cardInfo.volumeInfo.imageLinks.thumbnail : "no image"
  }">
 
  <a class="btn-floating halfway-fab waves-effect waves-light red save1"data-id="${id}"><i class="material-icons">add</i></a>
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Book Info<i class="material-icons right">more_vert</i></span>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${
      cardInfo.volumeInfo.title
    }<i class="material-icons right">close</i></span>
    <p>${cardInfo.volumeInfo.authors ? cardInfo.volumeInfo.authors.join(", ") : "no author"}</p>
  </div>
</div>
</div>
          
  `;

  $("#newResult").append(cardHtml);
}
// function to create cards for games
function displayGameCards(cardInfo, id) {
  console.log(cardInfo);
  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="gameImg" src="${cardInfo.background_image}">
 
  <a class="btn-floating halfway-fab waves-effect waves-light red save1"data-id="${id}"><i class="material-icons">add</i></a>
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Game Info<i class="material-icons right">more_vert</i></span>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${
      cardInfo.name
    }<i class="material-icons right">close</i></span>
    <p>${"Rating is: " + cardInfo.rating + " out of " + cardInfo.rating_top}</p>
  </div>
</div>
</div>
          
  `;

  $("#newResult").append(cardHtml);
}
// function to create cards for movies
function displayMovieCards(cardInfo, id) {
  // console.log(cardInfo);
  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="movieImg" src="${cardInfo.Poster}">
 
  <a class="btn-floating halfway-fab waves-effect waves-light red save1"data-id="${id}"><i class="material-icons">add</i></a>
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Movie Info<i class="material-icons right">more_vert</i></span>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${cardInfo.Title}<i class="material-icons right">close</i></span>
    <p></p>
  </div>
</div>
</div>
          
  `;

  $("#newResult").append(cardHtml);
}
// click handler to run when add input and search button when clicked
$(".books").on("click", function () {
  $("#newResult").empty();
  var searchDiv = $("<div>").attr("class", "searchDiv col s6 offset-s3");
  var inputField = $("<input></input>").attr("id", "search");
  var searchButton = $(
    "<button class = 'waves-effect deep-orange lighten-4 btn'>search books</button>"
  ).attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);
  // runs google books api function to search through books
  $("#searchBtn").on("click", displayBooks);
});
// click handler to run when add input and search button when clicked
$(".movies").on("click", function () {
  $("#newResult").empty();
  var searchDiv = $("<div>").attr("class", "searchDiv col s6 offset-s3");
  var inputField = $("<input></input>").attr("id", "search");
  var searchButton = $(
    "<button class = 'waves-effect deep-orange lighten-4 btn'>search movies</button>"
  ).attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);

  $("#searchBtn").on("click", displayMovies);
});
// click handler to run when add input and search button when clicked
$(".videoGames").on("click", function () {
  $("#newResult").empty();
  var searchDiv = $("<div>").attr("class", "searchDiv col s6 offset-s3");
  var inputField = $("<input></input>").attr("id", "search");
  var searchButton = $(
    "<button class = 'waves-effect deep-orange lighten-4 btn'>search video games</button>"
  ).attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);

  $("#searchBtn").on("click", displayGames);
});
// event for dropdown
$("#list").on("click", function () {
  // $("#newResult").empty();
  var myLists = localRead();

  console.log("this is an object", myLists.books[0]);

  // $(".results").html(contain);
});

function displayCardsStorage(cardInfo, id) {
  // console.log(cardInfo);

  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="bookImg" src="${cardInfo.imageLinks ? cardInfo.imageLinks.thumbnail : "no image"}">
 
  <a class="btn-floating halfway-fab waves-effect waves-light red clear1"data-id="${id}"><i class="material-icons">clear</i></a>
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Book Info<i class="material-icons right">more_vert</i></span>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${
      cardInfo.title
    }<i class="material-icons right">close</i></span>
    <p>${cardInfo.authors ? cardInfo.authors.join(", ") : "no author"}</p>
  </div>
</div>
</div>
          
  `;

  $("#newResult").prepend(cardHtml);
}
function displayGameCardsStorage(cardInfo, id) {
  // console.log(cardInfo);
  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="gameImg" src="${cardInfo.imageLinks}">
 
  <a class="btn-floating halfway-fab waves-effect waves-light red clear1"data-id="${id}"><i class="material-icons">clear</i></a>
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Game Info<i class="material-icons right">more_vert</i></span>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${cardInfo.title}<i class="material-icons right">close</i></span>
    <p>${cardInfo.rating}</p>
  </div>
</div>
</div>
          
  `;

  $("#newResult").prepend(cardHtml);
}
function displayMovieCardsStorage(cardInfo, id) {
  // console.log(cardInfo);
  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="movieImg" src="${cardInfo.imageLinks}">
 
  <a class="btn-floating halfway-fab waves-effect waves-light red clear1"data-id="${id}"><i class="material-icons">clear</i></a>
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Movie Info<i class="material-icons right">more_vert</i></span>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${cardInfo.title}<i class="material-icons right">close</i></span>
    <p></p>
  </div>
</div>
</div>
          
  `;

  $("#newResult").prepend(cardHtml);
}

$(".dropdown-trigger").dropdown();
$(".sidenav").sidenav();

// handles books dropdown
$("#booksDropdown").click(function () {
  var myLists = localRead();
  $("#newResult").empty();
  $("#results").empty();
  var booksHtml = `
  <h3>My Books</h3>

  `;

  myLists.books.forEach(function (value, index) {
    displayCardsStorage(value, index);
  });
  $(".results").html(booksHtml);

  console.log(myLists.books);
});

// handles movies drop down
$("#moviesDropdown").click(function () {
  var myLists = localRead();
  $("#newResult").empty();
  $("#results").empty();
  var moviesHtml = `
  <h3>My Movies</h3>
  `;
  myLists.movies.forEach(function (value, index) {
    displayMovieCardsStorage(value, index);
  });
  $(".results").html(moviesHtml);
});
// handles games drop down
$("#videoGamesDropdown").click(function () {
  var myLists = localRead();
  $("#newResult").empty();
  $("#results").empty();
  var videoGamesHtml = `
  <h3>My Video Games</h3>
  `;
  myLists.videoGames.forEach(function (value, index) {
    displayGameCardsStorage(value, index);
  });
  $(".results").html(videoGamesHtml);
});

//========================================================
// checks the storage when page is loaded
checkStorage();
//working js file test
