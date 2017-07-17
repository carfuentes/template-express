const genres={};
const people={};

$(document).ready(() => {

//Display year
  displayYears();

//Display different genres
  $.ajax({
    url: "https://api.themoviedb.org/3/genre/movie/list?api_key=3821daa8beffd485915cd4e0ba818fbc&language=en-US",
    method: "GET",
    success: displayGenres,
    error: handleError
  });




//   $(".form-filters").children().on("change", event => {
//     let dateFrom = $("#dateFrom").val();
//     let dateTo = $("#dateTo").val();
//     let currency = $("#currency option:selected").val();
//     $.ajax({
//       url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`,
//       method: "GET",
//       success: showMeTheMoney,
//       error: thereIsNoMoney
//     });
//   });

});

$("#cast").on("change paste", (event)=> {
  let mySearchedActor= $("#cast").val().toLowerCase().replace(' ',"%20");
  console.log(mySearchedActor);
    $.ajax({
      url: `https://api.themoviedb.org/3/search/person/?api_key=3821daa8beffd485915cd4e0ba818fbc&query=${mySearchedActor}`,
      method: "GET",
      success: showActors,
      error: handleError
    });

})

$('.form-filters').children().on("change", ()=> {
  let myGenre= $(".genre option:selected").val();
  let myYear=$(".year option:selected").val();
  let myActor=$(".actor").text();
  $.ajax({
      url: `https://api.themoviedb.org/3/discover/movie?api_key=3821daa8beffd485915cd4e0ba818fbc&with_genres=${genres[myGenre]}&year=${myYear}`,
      method: "GET",
      success: showMovies,
      error: handleError
    });
})

function displayGenres (response) {
   response.genres.forEach ((el) => {
     genres[el.name]=el.id;
    $(".genre").append(`<option value=${el.name}> ${el.name} </option>`)
   });

}

function displayYears () {
   for(var i=2017; i>1900; i--) {
    $(".year").append(`<option value=${i}> ${i} </option>`)
   };

}


function handleError(error) {
    console.log(error);
  }

function showMovies(response) {
  $(".output").html('');
  console.log(response.results)
  response.results.forEach((el)=> {
    $(".output").append(`<div class=movie> <img src=https://image.tmdb.org/t/p/w92/${el.poster_path}> Title: ${el.original_title} <br> Release date: ${el.release_date} <br> Overview: ${el.overview}</div>`)
  })
  
}

function showActors(response){
  console.log(response);
}

