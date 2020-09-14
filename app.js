let city = '';
let state = '';
let lat = '';
let long = '';
let today = new Date();
let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let date = day[today.getDay()] + ', ' + month[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();

const geoKey = 'ade29332ee9141dd84c4cfa731c7b5ab';
const weatherKey = '674266fd65a2456ae14430679807cc39';

let getWeather = async () => {
  city = document.querySelector('.input-area__city').value;
  state = document.querySelector('.input-area__state').value;
  const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${city}%2C${state}&key=${geoKey}`;

  // make fetch call (promise call)
  const geoResponse = await fetch(geoURL);

  // promise data
  const geoData = await geoResponse.json();
  lat = geoData.results[0].geometry.lat;
  long = geoData.results[0].geometry.lng;

  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&
exclude=minutely,hourly&appid=${weatherKey}`;

  const weatherResponse = await fetch(weatherURL);

  const weatherData = await weatherResponse.json();

  // current conditions variables
  const currentDesc = weatherData.current.weather[0].main;
  const currentTemp = Math.round(weatherData.current.temp);
  const currentFeels = Math.round(weatherData.current.feels_like);
  const currentHum = Math.round(weatherData.current.humidity);
  const currentWindSpeed = Math.round(weatherData.current.wind_speed);
  const currentWindDir = weatherData.current.wind_deg;

  // current conditions display
  document.querySelector('.current-display__date').innerHTML = date;
  document.querySelector('.current-display__location').innerHTML = `${city}, ${state}`;
  document.querySelector('.current-display__desc').innerHTML = currentDesc;
  document.querySelector('.current-display__temp--main').innerHTML = `${currentTemp}&deg;F`;
  document.querySelector('.current-display__temp--feels').innerHTML = `Feels Like: ${currentFeels}&deg;F`;
  document.querySelector('.current-display__hum').innerHTML = `Humidity: ${currentHum}% `;
  document.querySelector('.current-display__wind--speed').innerHTML = `Wind: ${currentWindSpeed}mph`;
  document.querySelector('.current-display__wind--dir').innerHTML = toTextualDescription(currentWindDir);

  // change degrees to wind direction
  function toTextualDescription(degree) {
    if (degree > 337.5) return 'N';
    if (degree > 292.5) return 'NW';
    if (degree > 247.5) return 'W';
    if (degree > 202.5) return 'SW';
    if (degree > 157.5) return 'S';
    if (degree > 122.5) return 'SE';
    if (degree > 67.5) return 'E';
    if (degree > 22.5) return 'NE';
    return 'N';
  }

  // Forecast date variables
  const day2 = dayShort[today.getDay() + 1] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 1) + ', ' + today.getFullYear();
  const day3 = dayShort[today.getDay() + 2] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 2) + ', ' + today.getFullYear();
  const day4 = dayShort[today.getDay() + 3] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 3) + ', ' + today.getFullYear();
  const day5 = dayShort[today.getDay() + 4] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 4) + ', ' + today.getFullYear();
  const day6 = dayShort[today.getDay() + 5] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 5) + ', ' + today.getFullYear();
  const day7 = dayShort[today.getDay() + 6] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 6) + ', ' + today.getFullYear();
  const day8 = dayShort[today.getDay()] + ' ' + monthShort[today.getMonth()] + ' ' + (today.getDate() + 7) + ', ' + today.getFullYear();

  // Forecast date display
  document.querySelector('.date-1').innerHTML = day2;
  document.querySelector('.date-2').innerHTML = day3;
  document.querySelector('.date-3').innerHTML = day4;
  document.querySelector('.date-4').innerHTML = day5;
  document.querySelector('.date-5').innerHTML = day6;
  document.querySelector('.date-6').innerHTML = day7;
  document.querySelector('.date-7').innerHTML = day8;

  // Forecast description variables
  const forDescDay1 = weatherData.daily[1].weather[0].main;
  const forDescDay2 = weatherData.daily[2].weather[0].main;
  const forDescDay3 = weatherData.daily[3].weather[0].main;
  const forDescDay4 = weatherData.daily[4].weather[0].main;
  const forDescDay5 = weatherData.daily[5].weather[0].main;
  const forDescDay6 = weatherData.daily[6].weather[0].main;
  const forDescDay7 = weatherData.daily[7].weather[0].main;

  // Forecast description display
  document.querySelector('.desc-1').innerHTML = forDescDay1;
  document.querySelector('.desc-2').innerHTML = forDescDay2;
  document.querySelector('.desc-3').innerHTML = forDescDay3;
  document.querySelector('.desc-4').innerHTML = forDescDay4;
  document.querySelector('.desc-5').innerHTML = forDescDay5;
  document.querySelector('.desc-6').innerHTML = forDescDay6;
  document.querySelector('.desc-7').innerHTML = forDescDay7;

  // Forecast Hi temp variables
  const forHiDay1 = Math.round(weatherData.daily[1].temp.max);
  const forHiDay2 = Math.round(weatherData.daily[2].temp.max);
  const forHiDay3 = Math.round(weatherData.daily[3].temp.max);
  const forHiDay4 = Math.round(weatherData.daily[4].temp.max);
  const forHiDay5 = Math.round(weatherData.daily[5].temp.max);
  const forHiDay6 = Math.round(weatherData.daily[6].temp.max);
  const forHiDay7 = Math.round(weatherData.daily[7].temp.max);

  // Forecast Hi temp display
  document.querySelector('.hi-day-1').innerHTML = `Hi: ${forHiDay1}&deg;F`;
  document.querySelector('.hi-day-2').innerHTML = `Hi: ${forHiDay2}&deg;F`;
  document.querySelector('.hi-day-3').innerHTML = `Hi: ${forHiDay3}&deg;F`;
  document.querySelector('.hi-day-4').innerHTML = `Hi: ${forHiDay4}&deg;F`;
  document.querySelector('.hi-day-5').innerHTML = `Hi: ${forHiDay5}&deg;F`;
  document.querySelector('.hi-day-6').innerHTML = `Hi: ${forHiDay6}&deg;F`;
  document.querySelector('.hi-day-7').innerHTML = `Hi: ${forHiDay7}&deg;F`;

  // Forecast Low temp variables
  const forLowDay1 = Math.round(weatherData.daily[1].temp.min);
  const forLowDay2 = Math.round(weatherData.daily[2].temp.min);
  const forLowDay3 = Math.round(weatherData.daily[3].temp.min);
  const forLowDay4 = Math.round(weatherData.daily[4].temp.min);
  const forLowDay5 = Math.round(weatherData.daily[5].temp.min);
  const forLowDay6 = Math.round(weatherData.daily[6].temp.min);
  const forLowDay7 = Math.round(weatherData.daily[7].temp.min);

  // Forecast Low temp display
  document.querySelector('.low-day-1').innerHTML = `Low: ${forLowDay1}&deg;F`;
  document.querySelector('.low-day-2').innerHTML = `Low: ${forLowDay2}&deg;F`;
  document.querySelector('.low-day-3').innerHTML = `Low: ${forLowDay3}&deg;F`;
  document.querySelector('.low-day-4').innerHTML = `Low: ${forLowDay4}&deg;F`;
  document.querySelector('.low-day-5').innerHTML = `Low: ${forLowDay5}&deg;F`;
  document.querySelector('.low-day-6').innerHTML = `Low: ${forLowDay6}&deg;F`;
  document.querySelector('.low-day-7').innerHTML = `Low: ${forLowDay7}&deg;F`;

  switch (currentDesc) {
    case 'Thunderstorm':
      document.querySelector('.current-display__icon--img').src = 'images/animated/thunder.svg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.current-display').style.color = '#fff';
      document.querySelector('.current-display__background').style.filter = 'brightness(70%)';
      break;
    case 'Drizzle':
      document.querySelector('.current-display__icon--img').src = 'images/animated/drizzle.svg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.current-display__background').style.filter = 'brightness(70%)';
      document.querySelector('.current-display').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.current-display__icon--img').src = 'images/animated/rainy.svg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.current-display__background').style.filter = 'brightness(70%)';
      document.querySelector('.current-display').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.current-display__icon--img').src = 'images/animated/snowy.svg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.current-display').style.color = '#fff';
      document.querySelector('.current-display__background').style.filter = 'brightness(70%)';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.current-display__icon--img').src = 'images/animated/foggy.jpg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.current-display__background').style.filter = 'brightness(70%)';
      document.querySelector('.current-display').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.current-display__icon--img').src = 'images/animated/day.svg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.current-display__background').style.filter = 'brightness(90%)';
      document.querySelector('.current-display').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.current-display__icon--img').src = 'images/animated/cloudy.svg';
      document.querySelector('.current-display__background').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.current-display').style.color = '#fff';
      document.querySelector('.current-display__background').style.filter = 'brightness(70%)';
      break;
  }

  switch (forDescDay1) {
    case 'Thunderstorm':
      document.querySelector('.day-1-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-1').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-1-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-1display').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-1-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-1').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-1-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-1').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-1-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-1-display').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-1-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.current-display').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-1-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-1-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-1').style.color = '#fff';

      break;
  }

  switch (forDescDay2) {
    case 'Thunderstorm':
      document.querySelector('.day-2-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-2-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-2-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-2-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-2-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-2-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-2-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-2-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-2').style.color = '#fff';

      break;
  }

  switch (forDescDay3) {
    case 'Thunderstorm':
      document.querySelector('.day-3-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-3-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-3-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-3-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-3-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-3-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-3-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-3-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-3').style.color = '#fff';

      break;
  }

  switch (forDescDay4) {
    case 'Thunderstorm':
      document.querySelector('.day-4-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-4-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-4-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-4-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-4-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-4-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-4-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-4-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-4').style.color = '#fff';

      break;
  }

  switch (forDescDay5) {
    case 'Thunderstorm':
      document.querySelector('.day-5-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-5-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-5-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-5-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-5-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-5-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-5-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-5-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-5').style.color = '#fff';

      break;
  }

  switch (forDescDay6) {
    case 'Thunderstorm':
      document.querySelector('.day-6-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-6-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-6-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-6-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-6-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-6-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-6-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-6-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-6').style.color = '#fff';

      break;
  }

  switch (forDescDay7) {
    case 'Thunderstorm':
      document.querySelector('.day-7-icon').src = 'images/animated/thunder.svg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/storm.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#fff';

      break;
    case 'Drizzle':
      document.querySelector('.day-7-icon').src = 'images/animated/drizzle.svg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#333';

      break;
    case 'Rain':
      document.querySelector('.day-7-icon').src = 'images/animated/rainy.svg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/rain.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#333';

      break;
    case 'Snow':
      document.querySelector('.day-7-icon').src = 'images/animated/snowy.svg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/snow.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#fff';
      break;
    case ('Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'):
      document.querySelector('.day-7-icon').src = 'images/animated/foggy.jpg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/fog.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#333';

      break;
    case 'Clear':
      document.querySelector('.day-7-icon').src = 'images/animated/day.svg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/clear-day.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#333';

      break;
    case 'Clouds':
      document.querySelector('.day-7-icon').src = 'images/animated/cloudy.svg';
      document.querySelector('.day-7-bg').src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector('.forecast__card--day-7').style.color = '#fff';

      break;
  }
  // Reset form
  document.querySelector('.input-area__form').reset();
};
