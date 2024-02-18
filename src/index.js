import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function kelvinToFahrenheit(temperatureInKelvin) {
  let temperatureInFahrenheit = (temperatureInKelvin - 273.15) * 1.8 + 32; //declare new var to round in next line
  return Math.round(temperatureInFahrenheit); //rounds to nearest whole
} //FFR you can also do this from OpenWeather API withtout a function

// UI Logic

function printElements(apiResponse, city) {
  let temperatureInFahrenheit = kelvinToFahrenheit(apiResponse.main.temp); // creates new var to call in text string
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Kelvins is ${temperatureInFahrenheit} degrees.`;
}

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});