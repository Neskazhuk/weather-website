const apiKey = '5dbcde64bbc722fdaa65928a9ce817b6'; // Пароль до бази даних

function getWeather() {
  // Пакуємо в функцію, щоб потім можна було працювати з цими даними
  const weatherInput = document.querySelector('#weatherInput'); // Дістаєм інпут з нашого html
    const city = weatherInput.textContent; // Дістаєм поточне значення інпута (шо там вписано)
    if (city === '') {
        return;
    }
    
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`) // Робимо запит на сервер
    .then(weather => weather.json()) // Конвертуємо дані з рядка в об'єкт (JSON)
    .then(handleWeather);
}

function handleWeather(weather) {
  const container = document.getElementById('container');
  container.innerHTML = '';

  // Обробити
  const cityName = document.createElement('p');
  cityName.innerText = weather.name;
  cityName.classList.add('city');

  const temperature = document.createElement('p');
  temperature.innerText = `${furenheitToCelsius(weather.main.temp)}℃`;
  temperature.classList.add('temperature');

  const feelsLike = document.createElement('p');
  feelsLike.innerText = `На ділі: ${furenheitToCelsius(weather.main.feels_like)}℃`;
  feelsLike.classList.add('feelslike');

  const weatherImg = document.createElement('img');
  weatherImg.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  weatherImg.classList.add('icon');

  container.appendChild(weatherImg);
  const weatherData = document.createElement('div');
  weatherData.classList.add('weather-data');
  weatherData.appendChild(cityName);
  weatherData.appendChild(temperature);
  weatherData.appendChild(feelsLike);
  container.appendChild(weatherData);
  console.log(weather);
}

function furenheitToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onEnter() {
  const input = document.getElementById('weatherInput');

  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      getWeather();
    }
  });
}

onEnter();
