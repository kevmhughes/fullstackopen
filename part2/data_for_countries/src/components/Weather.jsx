import React from "react";

const Weather = ({ weather, capital }) => {
  // Early return for loading state or incomplete data
  if (!weather || !weather.weather || !weather.main) {
    return (
      <div>
        <h1>Weather in {capital[0]}</h1>
        <p>...loading</p>
      </div>
    );
  }

  // If data is available, render the weather info
  return (
    <div>
      <h1>Weather in {capital[0]}</h1>
      <div>Temperature: {weather.main.temp}°C</div>
      <div>{weather.weather[0].main}</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>
        Wind: {weather.wind.speed} m<sup>2</sup>
      </div>
    </div>
  );
};

export default Weather;
