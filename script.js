/* ------ DOM refereces  -----------*/
const weatherForm = document.getElementById('weather-form');
const citySearch = document.getElementById('city-search');
const searchButton = document.getElementById('search-button');
const weatherData = document.getElementById('weather-data');

/* -------- JS Logic ----------- */

weatherForm.addEventListener ('submit',async function(event){
   event.preventDefault(); // prevents browser default behavior.
   const searchValue = citySearch.value.trim(); //Get & Clean value.
   if(!searchValue){ // Check for Valid Input.
     return; //exit if input not valid.
   }

   const apiSearchUrl = "https://geocoding-api.open-meteo.com/v1/search" + "?name=" + searchValue; 
   const response = await fetch(apiSearchUrl); // waits promise.
   const jsonResponse = await response.json(); // waits for json conversion to JS and response.
   if(jsonResponse.results.length === 0){ //check the returned array, for any values.
      return; // exits if no values found in response array.
   }

   const locationResult = jsonResponse.results[0]; // grabs first value, on array index 0.
   const latitude = locationResult.latitude;// grabs latitude property from locationResult.
   const longitude = locationResult.longitude;// grabs longitude property from locationResult.
   const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast' + '?latitude=' + latitude +
   '&longitude=' + longitude + '&current=temperature_2m' + '&temperature_unit=fahrenheit';//save base url and data to request from api.
   const weatherResponse = await fetch(weatherApiUrl);// waits for promise.
   const weatherJson = await weatherResponse.json();// converts JSON data to usable JS data.

   const currentTemp = weatherJson.current.temperature_2m;
   weatherData.textContent = `${searchValue.toUpperCase()}: ${currentTemp}°F`;

});