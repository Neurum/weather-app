let city = '';
let state = '';
let lat = '';
let long = '';
const today = new Date();
const currentDate = today.toDateString();

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

  console.log(currentDesc);

  // current conditions display
  document.querySelector('.current-display__date').innerHTML = currentDate;
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

  if (currentDesc === 'Thunderstorm') {
    document.querySelector('.current-display__icon').src = 'images/animated/thunder.svg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/storm.jpg';
    document.querySelector('.current-display').style.color = '#fff';
  } else if (currentDesc === 'Drizzle') {
    document.querySelector('.current-display__icon').src = 'images/animated/drizzle.svg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/rain.jpg';
    document.querySelector('.current-display').style.color = '#333';
  } else if (currentDesc === 'Rain') {
    document.querySelector('.current-display__icon').src = 'images/animated/rainy.svg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/rain.jpg';
    document.querySelector('.current-display').style.color = '#333';
  } else if (currentDesc === 'Snow') {
    document.querySelector('.current-display__icon').src = 'images/animated/snowy.svg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/snow.jpg';
    document.querySelector('.current-display').style.color = '#fff';
  } else if (currentDesc === 'Clear') {
    document.querySelector('.current-display__icon').src = 'images/animated/day.svg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/clear-day.jpg';
    document.querySelector('.current-display').style.color = '#333';
  } else if (currentDesc === 'Clouds') {
    document.querySelector('.current-display__icon').src = 'images/animated/cloudy.svg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/cloudy-day.jpg';
    document.querySelector('.current-display').style.color = '#fff';
  } else if (currentDesc === 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Ash' || 'Squall' || 'Tornado') {
    document.querySelector('.current-display__icon--img').src = 'images/animated/foggy.jpg';
    document.querySelector('.current-display__background').src = 'images/backgrounds/fog.jpg';
    document.querySelector('.current-display').style.color = '#333';
  }

  let day = [];
  for (i = 1; i <= 7; i++) {
    day[i] = today.setDate(today.getDate() + (i - (i - 1)));
  }

  let dateArray = [];
  for (i = 1; i <= 7; i++) {
    dateArray[i] = new Date(day[i]).toDateString();
  }

  for (i = 1; i <= 7; i++) {
    document.querySelector(`.date-${i}`).innerHTML = dateArray[i];
  }

  let forDescDay = [];
  for (let i = 1; i <= 7; i++) {
    forDescDay[i] = weatherData.daily[[i]].weather[0].main;
  }

  for (let i = 1; i <= 7; i++) {
    if (forDescDay[i] === 'Thunderstorm') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/thunder.svg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/storm.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#fff';
    } else if (forDescDay[i] === 'Drizzle') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/drizzle.svg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/rain.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#333';
    } else if (forDescDay[i] === 'Rain') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/rainy.svg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/rain.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#333';
    } else if (forDescDay[i] === 'Snow') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/snowy.svg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/snow.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#fff';
    } else if (forDescDay[i] === 'Clear') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/day.svg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/clear-day.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#333';
    } else if (forDescDay[i] === 'Clouds') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/cloudy.svg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/cloudy-day.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#fff';
    } else if (forDescDay[i] === 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Ash' || 'Squall' || 'Tornado') {
      document.querySelector(`.day-${i}-icon`).src = 'images/animated/foggy.jpg';
      document.querySelector(`.day-${i}-bg`).src = 'images/backgrounds/fog.jpg';
      document.querySelector(`.forecast__card--day-${i}`).style.color = '#333';
    }
  }

  for (let i = 1; i <= 7; i++) {
    document.querySelector(`.desc-${i}`).innerHTML = forDescDay[i];
  }

  let forHiDay = [];
  for (let i = 1; i <= 7; i++) {
    forHiDay[i] = Math.round(weatherData.daily[[i]].temp.max);
  }

  for (let i = 1; i <= 7; i++) {
    document.querySelector(`.hi-day-${i}`).innerHTML = `Hi: ${forHiDay[i]}&deg;F`;
  }

  let forLowDay = [];
  for (let i = 1; i <= 7; i++) {
    forLowDay[i] = Math.round(weatherData.daily[[i]].temp.min);
  }

  for (let i = 1; i <= 7; i++) {
    document.querySelector(`.low-day-${i}`).innerHTML = `Low: ${forLowDay[i]}&deg;F`;
  }

  // Reset form
  document.querySelector('.input-area__form').reset();
};
