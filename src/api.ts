import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export const getWeatherData = async (city) => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

  try {
    const response = await fetch(weatherURL);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const weatherData: any = await response.json();

    const weatherResponse = {
      location: weatherData.name,
      weather: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    };

    return weatherResponse;
  } catch (error) {
    console.log('Error fetching weather data: ', error);
    throw error;
  }
};
