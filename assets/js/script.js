var celebrityAPIKey = "GdDbXMeZU/1Ga5Z5HB4LVg==jEW7qzJCa2mUybyw";
var astrologyAPIKey = "8ee4ec9d42msha4833b4bc3bb1b2p1bb387jsne21e89998379";

var searchBar = $('#search-bar');
var searchBtn = $('#search-btn');
var resultsSection = $('#results-section');
var pastSearches = $('#past-searches');

var userInputArr = [];

function getLocalStorage() {
  var lsData= localStorage.getItem("userInputArr");
  var lsDataParsed = JSON.parse(lsData);

  userInputArr = lsDataParsed;
  console.log(lsDataParsed)
  

  // // undefined
  // if (localStorage.inputValues === undefined) {
  //   console.log('undefined')

  // // returns true if the value is 0, "", or null
  // } else if (!localStorage.inputValues === true) {
  //   console.log('0, "", or null')

  // // returns true if its anything but
  // } else {
  //   console.log("anything but")
    


  // }
}

getLocalStorage()

function celebritySearch() {
  var userInput = searchBar.val();
  var userInputLowerCase = userInput.toLowerCase();
  var userInputTrimmed = userInputLowerCase.trim();
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/celebrity?name=' + userInputTrimmed,
    headers: { 'X-Api-Key': celebrityAPIKey},
    contentType: 'application/json',
    success: function(result) {
      if (result.length === 0) {
        // initialize modal element
        var modalEl = document.createElement('div');
        modalEl.classList.add("modal")
        modalEl.textContent = "Invalid search. Please try again. Click anywhere to continue."

        // show modal
        mui.overlay('on', modalEl);

        // clears the user input
        searchBar.val("")
      } else {
        console.log(result);
        var cardEl = $('<div>').addClass('card');
        var nameEl = $('<h2>').text(result[0].name);
        var birthdayEl = $('<p>').text("Birthday: " + result[0].birthday);
        cardEl.append(nameEl, birthdayEl)

        // occupations
        var occupationArr = result[0].occupation
        for (let i = 0; i < occupationArr.length; i++) {
          var occupationEl = $('<p>').text(occupationArr[i]);
          cardEl.append(occupationEl)
        }

        resultsSection.append(cardEl)

        // clears the user input
        searchBar.val("")
      }
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
      // initialize modal element
      var modalEl = document.createElement('div');
      modalEl.classList.add("modal")
      modalEl.textContent = "Invalid search. Please try again. Click anywhere to continue."

      // show modal
      mui.overlay('on', modalEl);

      // clears the user input
      searchBar.val("")
    }
  });
}


function astrologySearch() {
  var userInput = searchBar.val();
  var userInputLowerCase = userInput.toLowerCase();
  var userInputTrimmed = userInputLowerCase.trim();
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + userInputTrimmed + "&day=today",
    "method": "POST",
    "headers": {
      "X-RapidAPI-Key": astrologyAPIKey,
      "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    var cardEl = $('<div>').addClass('card');
    var signEl = $('<h2>').text(userInputTrimmed);
    var dateRangeEl = $('<p>').text("Date Range: " + response.date_range);
    var descriptionEl = $('<p>').text("Daily horoscope: " + response.description);
    var luckyTimeEl = $('<p>').text("Lucky time: " + response.lucky_time);
    cardEl.append(signEl, dateRangeEl, descriptionEl, luckyTimeEl)
    resultsSection.append(cardEl)

    // clears the user input
    searchBar.val("")
  });
}


function searchFunction(event) {
  event.preventDefault()

  var userInput = searchBar.val();
  var userInputLowerCase = userInput.toLowerCase();
  var userInputTrimmed = userInputLowerCase.trim();

  userInputArr.push(userInputTrimmed);
  localStorage.setItem("userInputArr", JSON.stringify(userInputArr))
  console.log(localStorage.userInputArr)

  if (userInputTrimmed === "capricorn" || userInputTrimmed === "libra" || userInputTrimmed === "aries" || userInputTrimmed === "cancer" || userInputTrimmed === "taurus" || userInputTrimmed === "gemini" || userInputTrimmed === "leo" || userInputTrimmed === "virgo" || userInputTrimmed === "scorpio" || userInputTrimmed === "pisces" || userInputTrimmed === "aquarius" || userInputTrimmed === "sagittarius") {
    astrologySearch()
  } else {
    celebritySearch()
  }
}


// click listener to search button
searchBtn.on('click', searchFunction)