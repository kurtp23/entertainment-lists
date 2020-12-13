var key = "AIzaSyDTBCUxVbL39WQeQqdnu6uFJ5t5a2989_s";
var search = "Lion King";
queryURL = "https://www.googleapis.com/books/v1/volumes?q=";
function displayMovieInfo() {
  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL + search,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    function results(res) {
      for (let i = 0; i < res.items.length; i++) {
        item = res.items[i];
        title = item.volumeInfo.title;
        author = item.volumeInfo.authors;
        // img = item.volumeInfo.imageLinks.thumbnail;
      }
      console.log(item);
      console.log(title);
      console.log(author);

      var div = $("<div>");
      //   var respond = JSON.stringify(item);
      var titleEl$ = $("<p>").html(JSON.stringify(item.volumeInfo.title));
      var authorEl$ = $("<p>").html(JSON.stringify(item.volumeInfo.authors));
      var imgEl$ = $("<img>").html(
        `src`,
        JSON.stringify(item.volumeInfo.imageLinks.smallThumbnail)
      );
      $(div).append(titleEl$, authorEl$, imgEl$);

      $(".results").html(div);
    }
    results(response);

    // console.log(response.results);
    // var div = $("<div>");
    // var respond = JSON.stringify(response.results);
    // var bookEl$ = $("<p>").html(respond);

    // $(div).append(bookEl$);

    // $(".results").html(bookEl$);
  });
}

$("#books").on("click", displayMovieInfo);

// $("#list").on("click", function () {
//   var div1 = $("<div>").html("books");
//   var div2 = $("<div>").html("movies");
//   var div3 = $("<div>").html("video games");
//   var contain = $("<div>").append(div1, div2, div3);

//   $(".results").html(contain);
// });
