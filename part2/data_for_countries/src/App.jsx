import React from "react";
import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import List from "./components/List";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [message, setMessage] = useState("");
  const [toggleShowButton, setToggleShowButton] = useState(true);
  const [showCountry, setShowCountry] = useState([]);

  // Fetches country data from the API and stores it in the state
  useEffect(() => {
    countryService
      .getAllCountries()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Sets the message based on search term and filtered countries to inform the user
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

  // Filters countries based on the search term and updates the filteredCountry state
  useEffect(() => {
    const filteredCountries = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredCountry(filteredCountries);
  }, [searchTerm, countries]);

  // Handles the filter input change, and clears the showCountry view if it's active
  const handleFilter = (event) => {
    setSearchTerm(event.target.value);
    if (!toggleShowButton) {
      setToggleShowButton(!toggleShowButton);
      setShowCountry([]);
    }
  };

  // toggles showCountry view/country list and button text (show/hide)
  const handleClick = (item) => {
    if (toggleShowButton) {
      setToggleShowButton(!toggleShowButton);
      setShowCountry(item);
    } else {
      setToggleShowButton(!toggleShowButton);
      setShowCountry([]);
    }
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <List
        filteredCountry={filteredCountry}
        message={message}
        handleClick={handleClick}
        showCountry={showCountry}
        toggleShowButton={toggleShowButton}
      />
    </div>
  );
};

export default App;
