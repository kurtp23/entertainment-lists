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
    console.log(response);
    function results(res) {
      for (let i = 0; i < res.items.length; i += 2) {
        item = res.items[i];
        title = item.volumeInfo.title;
        author = item.volumeInfo.authors;
        // img = item.volumeInfo.imageLinks.thumbnail;

        item2 = res.items[i + 1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;

        console.log(item);
        console.log(title);
        console.log(author);

        var div = $("<div>");
        //   var respond = JSON.stringify(item);
        var titleEl$ = $("<p>").html(JSON.stringify(item.volumeInfo.title));
        var authorEl$ = $("<p>").html(JSON.stringify(item.volumeInfo.authors));
        var title2El$ = $("<p>").html(JSON.stringify(item2.volumeInfo.title));
        var author2El$ = $("<p>").html(JSON.stringify(item2.volumeInfo.authors));

        $(div).append(titleEl$, authorEl$, title2El$, author2El$);
      }

      $(".results").html(div);
    }
    results(response);
  });
}
// click handler to run when add input and search button when clicked
$("#books").on("click", function () {
  var searchDiv = $("<div>");
  var inputField = $("<input>search</input>").attr("id", "search");
  var searchButton = $("<button>search books</button>").attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);
  // runs google books api function to search through books
  $("#searchBtn").on("click", displayBooks);
});
// click handler to run when add input and search button when clicked
$("#movies").on("click", function () {
  var searchDiv = $("<div>");
  var inputField = $("<input>search</input>").attr("id", "search");
  var searchButton = $("<button>search movies</button>").attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);

  $("#searchBtn").on("click");
});
// click handler to run when add input and search button when clicked
$("#videoGames").on("click", function () {
  var searchDiv = $("<div>");
  var inputField = $("<input>search</input>").attr("id", "search");
  var searchButton = $("<button>search video games</button>").attr("id", "searchBtn");
  $(searchDiv).append(inputField, searchButton);
  $(".results").html(searchDiv);

  $("#searchBtn").on("click");
});
// adds 3 divs for each list
$("#list").on("click", function () {
  var div1 = $("<div>").html("books");
  var div2 = $("<div>").html("movies");
  var div3 = $("<div>").html("video games");
  var contain = $("<div>").append(div1, div2, div3);

  $(".results").html(contain);
});
