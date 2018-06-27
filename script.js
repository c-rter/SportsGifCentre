var sports = ["Basketball", "Hockey", "Baseball", "Soccer", "Football"];

makeButtons();
  
function displayGifs() { // Gather API Info and Display 10 Gifs in Div
    
    $("#gifSpot").empty();

    var sport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=0S28NX0PuHId3COVk6c1na3GiAfj65q5&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var sportDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var sportImage = $("<img>");
                sportImage.addClass("stateClass");
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("data-still", results[i].images.fixed_height_still.url);
                sportImage.attr("data-animate", results[i].images.fixed_height.url);
                sportImage.attr("data-state", "still");
                sportDiv.append(p);
                sportDiv.append(sportImage);
                $("#gifSpot").prepend(sportDiv);
            }
        });
}

function makeButtons() { // Create Buttons

    $("#buttonSpot").empty();
    
    for (var i = 0; i < sports.length; i++) {
        var s = $("<button>");
        s.addClass("sportButton");
        s.attr("data-name", sports[i]);
        s.text(sports[i]);
        $("#buttonSpot").append(s);
    }
}

$("#newSport").on("click", function(event) { // Add New Sport to Buttons
    event.preventDefault();
    var sport = $("#sportInput").val().trim();
    sports.push(sport);
    makeButtons();
});
  
$(document).on("click", ".sportButton", displayGifs); // Button Listener

$(document).on("click", ".stateClass", function() { // Toggle Pause / Animate Gifs
      
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
