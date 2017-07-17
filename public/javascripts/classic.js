$(document).ready( ()=> {

//Load forms
createForms('diet','shortDescription');
createForms('allergy','shortDescription');
createForms('cuisine','name');
createForms('course','name');



//Make request
$("#ingredients").on("change paste submit", (event)=> {
  event.preventDefault();
  let myIngredient= $("#ingredients").val().toLowerCase();
  $(".ingredient").append(`<input type="checkbox" name="eachIngredient" value=${myIngredient} checked>${myIngredient}<br>`);

})

$('.form-filters').on("submit", (e)=> {
    e.preventDefault();
})

// $("#ingredients").on("submit", (e)=> {
//     e.preventDefault();
// })


$('.form-filters').children().on("change", (event)=> {
   myDiet=getParameters('Diet');
   myCuisine=getParameters('Cuisine');
   myCourse=getParameters('Course');
   myAllergy=getParameters('Allergy');
   myIngredients=getParameters('Ingredient');


  $.ajax({
      url: `http://api.yummly.com/v1/api/recipes?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88&${myDiet}${myCuisine}${myAllergy}${myCourse}${myIngredients}requirePictures=true`,
      method: "GET",
      success: showRecipes,
      error: handleError
    });
})


});


//Function definitions
function showRecipes (response) {
  $(".output").html('');
  console.log(response.matches)
  response.matches.forEach((el)=> {
    $(".output").append(`
                    <div class=recipe> 
                        <div class="image">
                            <img src=${el.smallImageUrls[0].replace(/s90$/,"s350")}> 
                        </div>
                        <div class="info">
                            <span class='title'> Recipe: </span> ${el.recipeName} <br> 
                            <span class='title'> Ingredients: </span> ${[...el.ingredients]} <br> 
                            <span class='title'> Rating: ${el.rating}
                        </div>
                    
                    </div>
                    `)
  })
}

function createForms (filter,selector) {
$.ajax({
    url: `http://api.yummly.com/v1/api/metadata/${filter}?_app_id=7b6372ab&_app_key=446dc1e04dcdedcfe61b2515ec058e88`,
    method:"GET",
    success: function (response) { displayFilter(response,filter,selector)},
    error: handleError
  });

};

function displayFilter(response,filter,selector) {
      let jsonDocs= extractMetadata(response);
      $(`.${filter}`).append(` <label for="${filter}Input">${filter}</label><br>`)
      jsonDocs.forEach ((el)=> {

          $(`.${filter}`).append(`<input type="checkbox" name="each${filter}" value=${el.searchValue.replace(" ","%20")}>${el[selector]}`)
          
      })
    
  }

function getParameters (filter) {
    let myFilter='';
    $(`.${filter.toLowerCase()} input:checked`).each((index,el)=>{
        myFilter+=`allowed${filter}[]=${el.value}&`;
    })
    return myFilter;
}

function handleError (error) {
      console.log(error);
  }

function extractMetadata(response) {
    response = response.split(",").filter(function(chunk, index, array){
        return index != 0
    })
    response = response.join()
    response = response.split(")")[0];
        
    return JSON.parse(response);

}