var key = "AIzaSyDTBCUxVbL39WQeQqdnu6uFJ5t5a2989_s";
var search = "";
queryURL = "https://www.googleapis.com/books/v1/volumes?q=";
// function to search through books
function displayBooks() {
  search = $("#search").val().trim();
  // Creates AJAX call for google books api
  $.ajax({
    url: queryURL + search,
    method: "GET",
  }).then(function (response) {
    console.log("books", response);
    // console.log(response.items.length);

    response.items.forEach(function (value, index) {
      displayCards(value, index);
      $("#resultsContainer").on("click", ".save1", function () {
        var newSave = response.items[$(this).attr("data-id")];

        console.log(newSave);

        myLists.books += newSave;

        localStorage.setItem("listsObj", JSON.stringify(myLists));
      });
    });
  });
}

function displayGames() {
  search = $("#search").val().trim();
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
    var container = $("<div id='container'>");
    for (let i = 0; i < response.results.length; i++) {
      var cardHtml = `
      <div class="col s3 m3">
        <div class="card ">
          <div class="card-image">
            <img id="gameImg" src="${response.results[i].background_image}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Game info<i class="material-icons right">more_vert</i></span>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${
              response.results[i].name
            }<i class="material-icons right">close</i></span>
          <p>${
            "Rating is: " + response.results[i].rating + " out of " + response.results[i].rating_top
          }</p>
          <p>${"Released in(Y-M-D): " + response.results[i].released}<p>
          </div>
        </div>
      </div>   
  `;

      $(".results").append(cardHtml);
    }
  });
}

// click handler to run when add input and search button when clicked
$("#books").on("click", function () {
  var searchDiv = $("<div>");
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
$("#movies").on("click", function () {
  var searchDiv = $("<div>");
  var inputField = $("<input></input>").attr("id", "search");
  var searchButton = $(
    "<button class = 'waves-effect deep-orange lighten-4 btn'>search movies</button>"
  ).attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);

  $("#searchBtn").on("click", displayMovies);
});
// click handler to run when add input and search button when clicked
$("#videoGames").on("click", function () {
  var searchDiv = $("<div>");
  var inputField = $("<input></input>").attr("id", "search");
  var searchButton = $(
    "<button class = 'waves-effect deep-orange lighten-4 btn'>search video games</button>"
  ).attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);

  $("#searchBtn").on("click", displayGames);
});
// adds 3 divs for each list
$("#list").on("click", function () {
  var div1 = $("<div>").html("books");
  var div2 = $("<div>").html("movies");
  var div3 = $("<div>").html("video games");
  var contain = $("<div>").append(div1, div2, div3);

  $(".results").html(contain);
});

function displayCards(cardInfo, id) {
  // console.log(cardInfo);
  var cardHtml = `
  <div class="col s3 m3">
  <div class="card ">
  <div class="card-image">
  <img id="bookImg" src="${cardInfo.volumeInfo.imageLinks.thumbnail}">
 
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

  $(".results").append(cardHtml);
}

//========================================================
const queryURL3 = "https://www.omdbapi.com/?s=";
const key3 = "&apikey=trilogy";
var movieTitle = "";

// console.log(queryURL3 + movieTitle + key3);

//-------------------------------------------------------

// Function to search for movies

function displayMovies() {
  movieTitle = $("#search").val().trim();
  // console.log($("#search").val().trim());

  //Executes search command
  $.ajax({
    url: queryURL3 + movieTitle + key3,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // $("#search").text(JSON.stringify(response));
    for (j = 0; j < response.Search.length; j++) {
      var cardHtml = `
    <div class="col s3 m3">
      <div class="card ">
        <div class="card-image">
          <img id="movieImg" src="${response.Search[j].Poster}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">Movie Info<i class="material-icons right">more_vert</i></span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${response.Search[j].Title}<i class="material-icons right">close</i></span>
      
        </div>
      </div>
    </div>   
  `;

      $(".results").append(cardHtml);
    }
  });
}
const lists = {
  books: [],
  movies: { item2: "" },
  videoGames: { item3: "" },
};
if (localStorage.getItem("listsObj") === null) {
  localStorage.setItem("listsObj", JSON.stringify(lists));
}
const myLists = JSON.parse(localStorage.getItem("listsObj"));
console.log(myLists);
// console.log(myLists);

// $(".save1").on("click", function () {
//   var newSave = 1234;

//   console.log(newSave);

//   myLists.books.item1 += newSave;
//   // var blockText = storageBlocks[blockKey];
//   // console.log(blockText);

//   localStorage.setItem("listsObj", JSON.stringify(myLists));
// });

// $("#resultsContainer").on("click", ".save1", function () {
//   var newSave = 1234;

//   console.log(newSave);

//   myLists.books.item1 += newSave;

//   localStorage.setItem("listsObj", JSON.stringify(myLists));
// });

// $.each(storageBlocks, function (key, value) {
//   console.log(key, value);

//   $("#" + key + "t").val(value);
// });
