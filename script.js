/* ------ DOM references ----------- */
const weatherForm = document.getElementById('weather-form');
const citySearch = document.getElementById('city-search');
const searchButton = document.getElementById('search-button');
const weatherData = document.getElementById('weather-data');
const weatherData2 = document.getElementById('weather-data-2');


/* -------- JS Logic ----------- */

weatherForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // prevents browser default behavior.

  const searchValue = citySearch.value.trim(); // Get & Clean value.

  if (!searchValue) { // Check for Valid Input.
    return; // exit if input not valid.
  }


  const apiSearchUrl = "https://geocoding-api.open-meteo.com/v1/search" + "?name=" + searchValue;
  const response = await fetch(apiSearchUrl); // waits promise.
  const jsonResponse = await response.json(); // waits for json conversion to JS and response.

  if (jsonResponse.results.length === 0) { // check the returned array, for any values.
    return; // exits if no values found in response array.
  }


  const locationResult = jsonResponse.results[0]; // grabs first value, on array index 0.
  const latitude = locationResult.latitude; // grabs latitude property from locationResult.
  const longitude = locationResult.longitude; // grabs longitude property from locationResult.

  const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast' + '?latitude=' + latitude +
    '&longitude=' + longitude + '&current=temperature_2m,weather_code' + '&temperature_unit=fahrenheit'; // save base url and data to request from api.

  const weatherResponse = await fetch(weatherApiUrl); // waits for promise.
  const weatherJson = await weatherResponse.json(); // converts JSON data to usable JS data.
  console.log(weatherJson);


  const weatherCode = weatherJson.current.weather_code;
  let weatherDescription;
   switch(weatherCode){
      case 0:
         weatherDescription = "Clear Sky";
         break;

      case 1:
         weatherDescription = "Mainly Clear";
         break;

      case 2:
         weatherDescription = "Partly Cloudy";
         break;

      case 3:
         weatherDescription = "Overcast";
         break;

      case 45:
         weatherDescription = "Fog";
         break;

      case 48:
         weatherDescription = "Depositing Rime Fog";
         break;

      case 51:
      case 53:
      case 55:
         weatherDescription = "Drizzle";
         break;

      case 56:
      case 57:
         weatherDescription = "Freezing Drizzle";
         break;

      case 61:
      case 63:
      case 65:
         weatherDescription = "Rain";
         break;

      case 66:
      case 67:
         weatherDescription = "Freezing Rain";
         break;

      case 71:
      case 73:
      case 75:
         weatherDescription = "Snowfall";
         break;

      case 77:
         weatherDescription = "Snow Grains";
         break;

      case 80:
      case 81:
      case 82:
         weatherDescription = "Rain Showers";
         break;

      case 85:
      case 86:
         weatherDescription = "Snow Showers";
         break;

      case 95:
         weatherDescription = "Thunderstorm";
         break;

      case 96:
         eatherDescription = "Thunderstorm + Slight Hail";
         break;

      case 97:
         weatherDescription = "Heavy Thunderstorm";
         break;

      case 99:
         weatherDescription = "Thunderstorm + Heavy Hail";
         break;

      default:
         weatherDescription = "Description Unavailable";
         break;
}

  const currentTemp = weatherJson.current.temperature_2m;


  // line to display weather description here ?
  weatherData.textContent = `${searchValue.toUpperCase()}: ${currentTemp}°F`;
  weatherData2.textContent = `${weatherDescription}`;
  
});
   