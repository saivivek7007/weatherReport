// Load environment variables
require('dotenv').config();

const axios = require('axios');
const fs = require('fs');  // Import the file system module

const getWeather = async (city) => {
  try {
    const apiKey = process.env.WEATHERSTACK_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    const response = await axios.get(url);

    if (response.data.error) {
      console.log(`Error: ${response.data.error.info}`);
    } else {
      const weather = response.data.current;
      const output = `
        Current weather in ${city}:
        Temperature: ${weather.temperature}°C
        Weather: ${weather.weather_descriptions[0]}
        Wind Speed: ${weather.wind_speed} km/h
      `;

      // Write the output to a file
      fs.writeFile('weather_output.txt', output, (err) => {
        if (err) throw err;
        console.log('Weather information has been saved to weather_output.txt');
      });
    }
  } catch (error) {
    console.error(`Could not fetch weather data: ${error.message}`);
  }
};

// Ask the user for input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter a city name: ', (city) => {
  getWeather(city);
  readline.close();
});
