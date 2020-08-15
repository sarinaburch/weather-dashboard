

// creating global variables
var cityWeather = $("#city-weather");
var searchBar = $("#search-bar");
var searchedCities = $("#search-button");

searchedCities.push(searchBar);
localStorage.setItem("searchBar", JSON.stringify(searchedCities));

$("#previous-searches") = JSON.parse(localStorage.getItem("searchBar"));

// creating funtionality to search button and adding to local storage and adding API Key

$("#search-button").on("click", function (event) {
    event.preventDefault();


    var city = $("#search-bar").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&APPID=97dffc6fa8edcd6f709b8c102d9878cf";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var tempC = response.main.temp;
        var tempF = (tempC - 273.15) * 1.80 + 32;
        var icon = "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var iconImg = $("<img>");

        $("#temperature").text("Temperature: " + tempF.toFixed(2) + "\xB0" + "F");
        $("#humidity").text("Humidty: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

        $("#city-weather").text(response.name);
        iconImg.attr("src", icon)
        $("#city-weather").append(iconImg);

    });

    // function to display 5-day forecast
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=97dffc6fa8edcd6f709b8c102d9878cf";

    $.ajax({
        url: fiveDay,
        method: "GET"
    }).then(function (response) {
        var fiveDiv = ("#five-day");


        for (var i = 0; i < response.list.length; i++) {


            var temp = response.list[i].temperature;
            var tempF = (temp - 273.15) * 1.8 + 32;

            var card = $("<div>")
            card.text("date");
            $("#five-day").append(card);

            var div1 = tempF;
            var tempDiv = $("<div>");
            tempDiv.text(div1);
            card.append(tempDiv);

            var div2 = $("<div>")
            div2.text(response.list[i].humidity)
            div1.append(div2);


        }

    })
});