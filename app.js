   // 1. Create an array of strings that relate to a topic of my interest

   // 2. Save this array into a variable called topics

   // 3. Create a function/for loop that will loop thru each item in the array and append/create buttons for them

   // 4. When a button is clicked, page should grab 10 static non-animated gif images from the GIPHY API and place them on the page

   // 5. When user clicks on any image, it should animate. When clicked again, it should stop animating

   // 6. Display rating of image under each gif.

   // 7. Lastly, add a form that takes in user input and adds it into the topics array.

   // 8. Buttons should be created for each user input and it should be added into the array.

   var topics = ["clouds", "moon", "beach", "cave", "rainbow", "sunrise", "sunset", "crystals", "desert", "plants"];
   var responseCopy;
   var gifToggle = false;

  function displayGifyInfo() {

   var gif = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +    //q is what we are searching for
   gif + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";   //limit makes only that many to come back, in this case 10

      $.ajax({
          url: queryURL,
          method: "GET"
        }) .done(function(response) {

          $("nature").html("");
         
          for (var i = 0; i < 10; i++) {

            //only taking action if the photo has an appropriate rating
            var gifDiv = $("<div class='item'>");

            var rating = response.data[i].rating;

            var gifP = $('<p class="rating-info">');
            var gifImage = $('<img class="gif-image">');

            gifImage.attr("src", response.data[i].images.fixed_height_still.url);

            gifP.text('Rated: ' + rating);
            gifDiv.append(gifP);
            gifDiv.append(gifImage);
                     
            $("#nature").prepend(gifDiv);
          }

          responseCopy = response;
          return responseCopy;

        renderButtons();
      });
    }
    

   // Function for displaying my buttons
   function renderButtons(){
    //delete buttons prior to adding new gifs
      $("#natureButtons").empty();
       for (var i = 0; i < topics.length; i++) { 
        var topicButton = $("<button class='btn btn-info'>");
        //add a class of gify to my button
        topicButton.addClass("gify");
        //add a data attribute 
        topicButton.attr("data-name", topics[i]);
        //Giving the initial button text
        topicButton.text(topics[i]);
        $("#natureButtons").append(topicButton); 
      }
    }  

    //This function handles events where one button is clicked
    $("#add-gify").on("click", function(event){
      event.preventDefault();

      //Next line grabs input from the text box
      var gify = $("#nature-input").val().trim();

      if (gify != ""){
        //Adding the gif from the textbox to our array
        topics.push(gify);

        renderButtons();

      }
    });

    //function that swaps the gif of the image from still to in motion when image is clicked on

  function swapGif(){
    var state = $(this).index();
    if (gifToggle === false) {
      $(this).find("img").attr("src",responseCopy.data[state].images.fixed_height.url);
       gifToggle = true;
     } else{
      $(this).find("img").attr("src",responseCopy.data[state].images.fixed_height_still.url);
      gifToggle = false;
     }
    };
  
  //Function for displaying the GIF info
  //Using $(document).on instead of $(".gif").on to add event listeners to dynamically generated elements
  $(document).on("click", ".gify", displayGifyInfo);
  $(document).on("click", ".item", swapGif);

  //Calling the renderButtons function to display the initial buttons
  renderButtons();

  

       