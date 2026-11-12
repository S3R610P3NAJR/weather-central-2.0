/* ------------------- DOM references --------------------------- */
const weatherForm = document.getElementById('weather-form');
const citySearch = document.getElementById('city-search');
//const searchButton = document.getElementById('search-button');
const weatherData = document.getElementById('weather-data');
const weatherData2 = document.getElementById('weather-data-2');
const image = document.getElementById('animation-img');


/* -------------------- JS Logic ---------------------------------- */

weatherForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // prevents browser default behavior.

  const searchValue = citySearch.value.trim(); // Get & Clean value.

  if (!searchValue) { // Check for Valid Input.
    return; // exit if input not valid.
  }

  /* ---------------  API Fetch ------------------------------------- */

  const apiSearchUrl = "https://geocoding-api.open-meteo.com/v1/search" + "?name=" + searchValue;
  let weatherJson;
  let jsonResponse;
  

  try{
   const response = await fetch(apiSearchUrl); // waits promise.

   if (!response.ok){
        weatherData.textContent = "HTTP request was unsuccessful.";
       return;
   } else {
      jsonResponse = await response.json(); //Waits for the response body to be converted from JSON into a JavaScript object.
   }
  
   
   if (!jsonResponse.results || jsonResponse.results.length === 0) { // check the returned array, for any values.
    weatherData.textContent = 'Sorry, City Not Found.';
    return;
  };


  const locationResult = jsonResponse.results[0]; // grabs first value, on array index 0.
  const latitude = locationResult.latitude; // grabs latitude property from locationResult.
  const longitude = locationResult.longitude; // grabs longitude property from locationResult.

  const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast' + '?latitude=' + latitude +
  '&longitude=' + longitude + '&current=temperature_2m,weather_code,is_day' + '&temperature_unit=fahrenheit'; // save base url and data to request from api.
  const weatherResponse = await fetch(weatherApiUrl); 
  
  if(!weatherResponse.ok){
    weatherData.textContent = "HTTP request was unsuccessful.";
    return;
    } else {
     weatherJson = await weatherResponse.json(); // Waits for the response body to be converted from JSON into a JavaScript object
    };



  } catch (error){
   weatherData.textContent = 'Api Network Connection Error.';
   return;
  }


  /* ------------------- Switch ---------------------------------------*/

const weatherCode = weatherJson.current.weather_code;
const dayNight = weatherJson.current.is_day;
let weatherDescription;
let animation;
switch(weatherCode) {
  case 0:
    weatherDescription = "Clear Sky";

    if (dayNight === 1) {
      animation = "images/clear-sky.svg";
    } else {
      animation = "images/clear-night.svg";
    }

    break;

  case 1:
    weatherDescription = "Mainly Clear";

    if (dayNight === 1) {
      animation = "images/mainly-clear.svg";
    } else {
      animation = "images/clear-night.svg";
    }

    break;

  case 2:
    weatherDescription = "Partly Cloudy";

    if (dayNight === 1) {
      animation = "images/partly-cloudy.svg";
    } else {
      animation = "images/partly-cloudy-night.svg";
    }

    break;

  case 3:
    weatherDescription = "Overcast";

    if (dayNight === 1) {
      animation = "images/overcast.svg";
    } else {
      animation = "images/overcast-night.svg";
    }

    break;

  case 45:
    weatherDescription = "Fog";

    if (dayNight === 1) {
      animation = "images/fog.svg";
    } else {
      animation = "images/fog-night.svg";
    }

    break;

  case 48:
    weatherDescription = "Depositing Rime Fog";

    if (dayNight === 1) {
      animation = "images/fog.svg";
    } else {
      animation = "images/fog-night.svg";
    }

    break;

  case 51:
  case 53:
  case 55:
    weatherDescription = "Drizzle";

    if (dayNight === 1) {
      animation = "images/drizzle.svg";
    } else {
      animation = "images/drizzel-night.svg";
    }

    break;

  case 56:
  case 57:
    weatherDescription = "Freezing Drizzle";

    if (dayNight === 1) {
      animation = "images/drizzle.svg";
    } else {
      animation = "images/freezing-drizzle-night.svg";
    }

    break;

  case 61:
  case 63:
  case 65:
    weatherDescription = "Rain";

    if (dayNight === 1) {
      animation = "images/rain.svg";
    } else {
      animation = "images/rain-showers-night.svg";
    }

    break;

  case 66:
  case 67:
    weatherDescription = "Freezing Rain";

    if (dayNight === 1) {
      animation = "images/rain.svg";
    } else {
      animation = "images/freezing-drizzle-night.svg";
    }

    break;

  case 71:
  case 73:
  case 75:
    weatherDescription = "Snowfall";

    if (dayNight === 1) {
      animation = "images/snow.svg";
    } else {
      animation = "images/snow-fall-night.svg";
    }

    break;

  case 77:
    weatherDescription = "Snow Grains";

    if (dayNight === 1) {
      animation = "images/snow-grains.svg";
    } else {
      animation = "images/snow-fall-night.svg";
    }

    break;

  case 80:
  case 81:
  case 82:
    weatherDescription = "Rain Showers";

    if (dayNight === 1) {
      animation = "images/rain-showers.svg";
    } else {
      animation = "images/rain-showers-night.svg";
    }

    break;

  case 85:
  case 86:
    weatherDescription = "Snow Showers";

    if (dayNight === 1) {
      animation = "images/snow-grains.svg";
    } else {
      animation = "images/snow-showers-night.svg";
    }

    break;

  case 95:
    weatherDescription = "Thunderstorm";

    if (dayNight === 1) {
      animation = "images/thunderstorms.svg";
    } else {
      animation = "images/thunderstorm-night.svg";
    }

    break;

  case 96:
    weatherDescription = "Thunderstorm + Slight Hail";

    if (dayNight === 1) {
      animation = "images/thunderstorms.svg";
    } else {
      animation = "images/thunderstorms-hail-night-snow.svg";
    }

    break;

  case 97:
    weatherDescription = "Heavy Thunderstorm";

    if (dayNight === 1) {
      animation = "images/heavy-thunderstorms.svg";
    } else {
      animation = "images/thunderstorm-night.svg";
    }

    break;

  case 99:
    weatherDescription = "Thunderstorm + Heavy Hail";

    if (dayNight === 1) {
      animation = "images/heavy-hail.svg";
    } else {
      animation = "images/thunderstorms-hail-night-snow.svg";
    }

    break;

  default:
    weatherDescription = "Description Unavailable";

    if (dayNight === 1) {
      animation = "images/unavailable.svg";
    } else {
      animation = "images/unavailable.svg";
    }

    break;
}

  const currentTemp = weatherJson.current.temperature_2m;


  /* ------------------ DOM Manipulation ----------------------------------- */
  weatherData.textContent = `${searchValue.toUpperCase()}: ${currentTemp}°F`;
  weatherData2.textContent = `${weatherDescription}`;
  image.data = animation;

  
});
   

