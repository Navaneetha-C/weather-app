async function getWeather() {
    const city = document.getElementById('city').value.trim(); // Trim to avoid leading/trailing spaces
    const apiKey = '249a352e70047f3163998dcbadb44e21'; // Replace with your actual OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            // If the response is not ok, handle different error statuses
            throw new Error(`Error: ${weatherResponse.status} - ${weatherResponse.statusText}`);
        }
        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-result').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(weatherData) {
    const weatherResult = document.getElementById('weather-result');
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const cityName = weatherData.name;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    weatherResult.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <img src="${iconUrl}" alt="${description}">
    `;
}

document.getElementById('weather-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    getWeather();
});
