import React from "react";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import List from "./components/List";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [message, setMessage] = useState("");

  console.log(filteredCountry);

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

  useEffect(() => {
    const fetchcountries = () => {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchcountries();
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredCountry(filteredCountries);
  }, [searchTerm]);

  const handleFilter = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <List filteredCountry={filteredCountry} message={message} />
    </div>
  );
};

export default App;
