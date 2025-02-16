function getWeather() {
    const apiKey = `0eeb3a6b898d9f15d0fe6c39751e3381`;
    const city = document.getElementById(`city`).value;

    if (!city) {
        alert(`Please enter a city`);
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Get current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error occurred while retrieving current weather", error);
            alert("Error occurred while retrieving current weather");
        });

    // Get hourly forecast
    fetch(hourlyForecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error("Error occurred while retrieving hourly weather forecast", error);
            alert("Error occurred while retrieving hourly weather forecast");
        });
}

function displayWeather(data) {
    const tempInfo = document.getElementById(`temp`);
    const weatherInfo = document.getElementById(`weather-info`);
    const weatherImg = document.getElementById(`weather-img`);
    const hourlyForecast = document.getElementById(`hourly-forecast`);

    weatherInfo.innerHTML = '';
    hourlyForecast.innerHTML = '';
    tempInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHtml = `<p>${cityName}</p>
                             <p>${description}</p>`;

        tempInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHtml;
        weatherImg.src = iconUrl;
        weatherImg.alt = description;

        showImage();
    }
}

function displayHourlyForecast(data) {
    const hourlyForecast = document.getElementById(`hourly-forecast`);
    hourlyForecast.innerHTML = '';
    const next24Hours = data.slice(0, 8); // Get the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hours = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hours}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>`;

        hourlyForecast.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherImg = document.getElementById(`weather-img`);
    weatherImg.style.display = `block`;
}
