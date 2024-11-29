import React from "react";

const View = ({ countryData }) => {
  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <h3>capital(s): </h3>
      <ul>
        {Object.values(countryData.capital).map((city) => (
          <li key={`${countryData.cca3}-${city}`}>{city}</li>
        ))}
      </ul>
      <div>area: {countryData.area} km²</div>
      <h3>language(s): </h3>
      <ul>
        {Object.values(countryData.languages).map((language) => (
          <li key={`${countryData.cca3}-${language}`}>{language}</li>
        ))}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt} />
    </div>
  );
};

export default View;
