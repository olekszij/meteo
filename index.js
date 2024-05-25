require('dotenv').config();

const express = require('express'); // Corrected import statement
const axios = require('axios');
const APIKEY = process.env.API;
const app = express();

app.get('/', async (req, res) => {
  try {
    const getMeteo = async () => {
      // Corrected function declaration and added async keyword
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${APIKEY}&units=metric`
        );
        // console.log('API Response:', response.data); // Log API response data
        return response.data;
      } catch (error) {
        console.log('Error:', error); // Log the error
        throw error;
      }
    };

    const weatherData = await getMeteo();
    console.log('Weather Data:', weatherData); // Log the weather data

    res.json(weatherData);
  } catch (error) {
    console.log('Catch Error:', error.message); // Log the error message in catch block
    res.json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
