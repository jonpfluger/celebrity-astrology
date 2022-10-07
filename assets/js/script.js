var celebrityAPIKey = "GdDbXMeZU/1Ga5Z5HB4LVg==jEW7qzJCa2mUybyw"

var astrologyAPIKey = "8ee4ec9d42msha4833b4bc3bb1b2p1bb387jsne21e89998379"

var searchBar = $('#search-bar')
var searchBtn = $('#search-btn')
var resultsSection = $('#results-section')
var pastSearches = $('#past-searches')





function celebritySearch() {
  var userInput = searchBar.val()
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/celebrity?name=' + userInput,
    headers: { 'X-Api-Key': celebrityAPIKey},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        var nameEl = $('<p>').text(result[0].name)
        var birthdayEl = $('<p>').text(result[0].birthday)
        resultsSection.append(nameEl, birthdayEl)
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
  });
}



function astrologySearch() {
  var userInput = searchBar.val()
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + userInput + "&day=today",
    "method": "POST",
    "headers": {
      "X-RapidAPI-Key": astrologyAPIKey,
      "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}


function searchFunction(event) {
  event.preventDefault()
  var userInput = searchBar.val()
  console.log(event, "Clicked!")

  if (userInput === "capricorn" || userInput === "libra" || userInput === "aries" || userInput === "cancer" || userInput === "taurus" || userInput === "gemini" || userInput === "leo" || userInput === "virgo" || userInput === "scorpio" || userInput === "pisces" || userInput === "aquarius" || userInput === "sagittarius") {
    astrologySearch()
  } else {
    celebritySearch()
  }



}


// click listener to search button
searchBtn.on('click', searchFunction)


// test







/*

-------CELEBRITY---------

CODE SNIPPET:

var name = 'Michael Jordan'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/celebrity?name=' + name,
    headers: { 'X-Api-Key': celebrityAPIKey},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


EXAMPLE RESPONSE:

[
  {
    "name": "michael jordan",
    "net_worth": 2200000000,
    "gender": "male",
    "nationality": "us",
    "occupation": [
      "basketball_player",
      "athlete",
      "spokesperson",
      "entrepreneur",
      "actor"
    ],
    "height": 1.98,
    "birthday": "1963-02-17",
  }
]



------ASTROLOGY--------

CODE SNIPPET: 

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=aquarius&day=today",
	"method": "POST",
	"headers": {
		"X-RapidAPI-Key": astrologyAPIKey,
		"X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


EXAMPLE RESPONSE: 

color:"Blue"
compatibility:"Taurus"
current_date:"September 24, 2020"
date_range:"Jan 20 - Feb 18"
description:"Your busy lifestyle has been fun, but today it's time to slow down and just relax."
lucky_number:"93"
lucky_time:"6pm"
mood:"Relieved"


*/