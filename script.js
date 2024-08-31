document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = 'ee412d67ad8f2d2ea05ffafc4cf32585'; // Replace with your API key from OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherResult = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weather-result').innerHTML = weatherResult;
            } else {
                document.getElementById('weather-result').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weather-result').innerHTML = `<p>Error fetching weather data.</p>`;
            console.error('Error:', error);
        });
});
