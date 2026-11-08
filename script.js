/* ------ DOM references ----------- */
const weatherForm = document.getElementById('weather-form');
const citySearch = document.getElementById('city-search');
const searchButton = document.getElementById('search-button');
const weatherData = document.getElementById('weather-data');
const weatherData2 = document.getElementById('weather-data-2');
const image = document.getElementById('animation-img');


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
  let animation;
   switch(weatherCode){
      case 0:
         weatherDescription = "Clear Sky";
         animation = "images/clear-sky.svg" ;
         break;

      case 1:
         weatherDescription = "Mainly Clear";
         animation = "images/mainly-clear.svg";
         break;

      case 2:
         weatherDescription = "Partly Cloudy";
         animation = "images/partly-cloudy.svg";
         break;

      case 3:
         weatherDescription = "Overcast";
         animation = "images/overcast.svg";
         break;

      case 45:
         weatherDescription = "Fog";
         animation = "images/fog.svg";
         break;

      case 48:
         weatherDescription = "Depositing Rime Fog";
         animation = "images/fog.svg";
         break;

      case 51:
      case 53:
      case 55:
         weatherDescription = "Drizzle";
         animation = "images/drizzle.svg";
         break;

      case 56:
      case 57:
         weatherDescription = "Freezing Drizzle";
         animation = "images/drizzle.svg";
         break;

      case 61:
      case 63:
      case 65:
         weatherDescription = "Rain";
         animation = "images/rain.svg";
         break;

      case 66:
      case 67:
         weatherDescription = "Freezing Rain";
         animation = "images/rain.svg";
         break;

      case 71:
      case 73:
      case 75:
         weatherDescription = "Snowfall";
         animation = "images/snow.svg";
         break;

      case 77:
         weatherDescription = "Snow Grains";
         animation = "images/snow-grains.svg";
         break;

      case 80:
      case 81:
      case 82:
         weatherDescription = "Rain Showers";
         animation = "images/rain-showers.svg";
         break;

      case 85:
      case 86:
         weatherDescription = "Snow Showers";
         animation = "images/rain-showers.svg";
         break;

      case 95:
         weatherDescription = "Thunderstorm";
         animation = "images/thunderstorms.svg";
         break;

      case 96:
         weatherDescription = "Thunderstorm + Slight Hail";
         animation = "images/heavy-hail.svg";
         break;

      case 97:
         weatherDescription = "Heavy Thunderstorm";
         animation = "images/heavy-thunderstorms.svg";
         break;

      case 99:
         weatherDescription = "Thunderstorm + Heavy Hail";
         animation = "images/heavy-hail.svg";
         break;

      default:
         weatherDescription = "Description Unavailable";
         animation = "images/unavailable.svg";
         break;
}

  const currentTemp = weatherJson.current.temperature_2m;


  // line to display weather description here ?
  weatherData.textContent = `${searchValue.toUpperCase()}: ${currentTemp}°F`;
  weatherData2.textContent = `${weatherDescription}`;
  image.data = animation;

  
});
   