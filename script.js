document.addEventListener("DOMContentLoaded", () => {
    const currentLocationDisplay = document.getElementById("currentLocation");
    const todayWeatherDataContainer = document.getElementById("todayWeatherData");
    const fiveDayForecastContainer = document.getElementById("interactiveForecast");
    const additionalWeatherDataContainer = document.getElementById("additionalWeatherData");
    const locationInput = document.getElementById("location");
    const apiKey = "b129b1dabde7fa81134c60c161446d16";


    function updateTodayWeatherData(data) {
        const { name, main, weather } = data;
        const { temp, humidity } = main;
        const weatherDescription = weather[0].description;
        const todayWeatherHTML = `
            <h3>${name} - Today's Weather</h3>
            <p>Date: ${getCurrentDate()}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Weather: ${weatherDescription}</p>
        `;
        todayWeatherDataContainer.innerHTML = todayWeatherHTML;
    }

    function updateAdditionalWeatherData(data) {
        const additionalWeatherHTML = `
            <h4>Additional Weather Details</h4>
            <p>Real Feel: ${data.main.feels_like}°C</p>
            <p>UV Index: ${data.uvi}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Cloud Cover: ${data.clouds.all}%</p>
            <p>Visibility: ${data.visibility / 1000} km</p>
        `;
        additionalWeatherDataContainer.innerHTML = additionalWeatherHTML;
    }

    async function getWeatherData(location) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error("Weather data not available for the given location.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }


    async function getForecastData(location) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error("Forecast data not available for the given location.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            return null;
        }
    }

    
    function getCurrentDate() {
        const today = new Date();
        return today.toDateString();
    }

    
    document.getElementById("searchBtn").addEventListener("click", async () => {
        const location = locationInput.value;
        const todayWeatherData = await getWeatherData(location);
        const forecastWeatherData = await getForecastData(location);

        if (todayWeatherData) {
            updateTodayWeatherData(todayWeatherData);
            updateAdditionalWeatherData(todayWeatherData);
        }

        if (forecastWeatherData) {
            updateForecastWeatherData(forecastWeatherData);
        }
    });

});

