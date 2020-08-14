$(document).ready(function() {

// creating global variables

var searchBox = ("search-bar");
var searchButton = ("searchButton")
var cityWeather = ("city-weather");
var fiveDay = ("five-day");

// creating funtionality to search button and adding to local storage and adding API Key

var cityInput = $("#search-bar")
$(".searchButton").click(function(){
    localStorage.setItem("searchButton", "city");
});
var searchedCities = localStorage.getItem("searchButton");
});