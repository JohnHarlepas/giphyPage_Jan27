$(document).ready(function() {

    var sports = [
        "Washington Redskins", "Minnesota Vikings", "Philadelphia Eagles", "Atlanta Braves", "New Yor Mets", "Washington Nationals",
        "Chicago Cubs", "Cincinnati Reds", "St. Louis Cardinals", "Tampa Bay Rays", "Detriot Red Wings",
        "Chicago Bulls", "Buffalo Bills", "Miami Dolphins", "New York Jets", "Houston Texans",
        "Jacksonvill Jaguars", "Kansas City Chiefs", "Atlanta Falcons", "Los Angeles Rams", "Seattle Seahawks"
    ];
  
    // function creates and adds buttons to page
    function buttonsOnScreen(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".sport-button", function() {
      $("#sports").empty();
      $(".sport-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      // don't forget that to limit the number of responses to 10 you need to add "&limit10" to your api key
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=7LxU1e4Kmw3Eqc8VBvrv5qmaeMl3LBms&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var sportDiv = $("<div class=\"sport-item\">");
  
            var warningLabel = results[i].rating;
  
            var p = $("<p>").text("Rating: " + warningLabel);
  
            var moving = results[i].images.fixed_height.url;
            var stop = results[i].images.fixed_height_still.url;
  
            var sportImage = $("<img>");
            sportImage.attr("src", stop);
            sportImage.attr("data-stop", stop);
            sportImage.attr("data-animate", moving);
            sportImage.attr("data-state", "stop");
            sportImage.addClass("sport-image");
  
            sportDiv.append(p);
            sportDiv.append(sportImage);
  
            $("#sports").append(sportDiv);
          }
        });
    });
  
    $(document).on("click", ".sport-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "stop") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-stop"));
        $(this).attr("data-state", "stop");
      }
    });
  
    $("#add-sport").on("click", function(event) {
      event.preventDefault();
      var newSport = $("input").eq(0).val();
  
      if (newSport.length > 2) {
        sports.push(newSport);
      }
  
      buttonsOnScreen(sports, "sport-button", "#sport-buttons");
  
    });
  
    buttonsOnScreen(sports, "sport-button", "#sport-buttons");
  });
  