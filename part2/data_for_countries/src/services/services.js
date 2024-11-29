import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

const getAllCountries = () => {
  return axios.get(baseUrl);
};

const getWeatherData = (city, apiKey) => {
  return axios.get(baseWeatherUrl, {
    params: {
      q: city,  
      appid: apiKey,  
      units: 'metric'  
    }
  });
};

export default {
  getAllCountries,
  getWeatherData
};
