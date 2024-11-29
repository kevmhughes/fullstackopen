import React, { useEffect, useState } from "react";
import List from "./components/List";
import Filter from "./components/Filter";
import Services from "./services/services";

const App = () => {
  const weatherAPI = import.meta.env.VITE_OPEN_WEATHER_KEY;

  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  // Fetches all countries
  useEffect(() => {
    Services.getAllCountries()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetches the weather data from https://openweathermap.org
  useEffect(() => {
    if (!city) return;
    Services.getWeatherData(city, weatherAPI)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, [city]);

  // Filters countries
  useEffect(() => {
    const countriesFiltered = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredCountry(countriesFiltered);
    if (countriesFiltered.length === 1) {
      setCity(countriesFiltered[0].capital[0].toString());
    }
  }, [searchTerm]);

  // Sets countries based on search results
  useEffect(() => {
    if (searchTerm.length === 0) {
      setMessage("Enter a search term.");
    } else if (filteredCountry.length > 10) {
      setMessage("Too many matches, specify another filter.");
    } else if (filteredCountry.length === 0 && searchTerm.length > 0) {
      setMessage("No matches found.");
    } else {
      setMessage("");
    }
  }, [searchTerm, filteredCountry]);

  const handleFilter = (event) => {
    setSearchTerm(event.target.value);
    setCity("");
  };

  const handleClick = (country) => {
    setFilteredCountry([country]);
    setCity([country][0].capital[0].toString());
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <List
        filteredCountry={filteredCountry}
        message={message}
        handleClick={handleClick}
        weather={weather}
      />
    </div>
  );
};

export default App;
