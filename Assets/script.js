

// creating global variables
var cityWeather = $("#city-weather");
var searchBar = $("#search-bar");
var searchedCities = $("#search-button");

searchedCities.push(searchBar);
localStorage.setItem("searchBar", JSON.stringify(searchedCities));


// creating funtionality to search button and adding to local storage and adding API Key

$("#search-button").on("click", function (event) {
    event.preventDefault();


    var city = $("#search-bar").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&APPID=97dffc6fa8edcd6f709b8c102d9878cf";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=97dffc6fa8edcd6f709b8c102d9878cf&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        var tempC = response.main.temp;
        var tempF = (tempC - 273.15) * 1.80 + 32;
        var icon = "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var iconImg = $("<img>");

        $("#temperature").text("Temperature: " + tempF.toFixed(2) + "\xB0" + "F");
        $("#humidity").text("Humidty: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");
        $("#uvIndex").text("UV Index: " + uvIndex);

        $("#city-weather").text(response.name);
        iconImg.attr("src", icon)
        $("#city-weather").append(iconImg);

    });
    $("#city-weather").empty();
});
// function to display 5-day forecast

$("#search-button").on("click", function (event) {
    event.preventDefault();

    var city = $("#search-bar").val();

    // var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=97dffc6fa8edcd6f709b8c102d9878cf";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=97dffc6fa8edcd6f709b8c102d9878cf";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);



        for (var i = 0; i < 5; i++) {
            // var fiveDiv = $("#five-day");
            var icon = "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";

            var tempC = (response.list[i].main.temp);
            var tempF = (tempC - 273.15) * 1.8 + 32;
            console.log(tempF);


            //Getting dates added 
            var startDate = ("August " + (12 + 1) + " , 2020")
            var card = $("<div class='card' style='width: 125px;'>")
            card.text("Date: " + startDate);
            $("#five-day").append(card);

            var imgIcon = $("<img>");
            imgIcon.attr("src", icon);
            $(card).append(imgIcon);

            // var div1 = tempF;
            var tempDiv = $("<div>");
            tempDiv.text("Temperature: " + tempF);
            $(card).append(tempDiv);

            var div2 = $("<div>")
            div2.text("Humidity: " + response.list[i].main.humidity)
            $(card).append(div2);

            

        }

    });
    $("#five-day").empty();

});
    var searches = searchedCities.val().trim()

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        var prevSearches = $("#search-bar").val();
        localStorage.setItem("prevSearches", prevSearches);

        function init() {
            localStorage.getItem("prevSearches", prevSearches);

        }

        var searches = $("<div>");
        searches.text(prevSearches);
        $("#previous-searches").append(searches);

    })