import React from "react";
import Message from "./Message";
import Button from "./Button";
import View from "./View";
import Weather from "./Weather";

const List = ({ filteredCountry, message, handleClick, weather }) => {
  if (message) {
    return <Message message={message} />;
  }

  if (filteredCountry.length === 1) {
    return (
      <div>
        <View countryData={filteredCountry[0]} />
        <Weather weather={weather} capital={filteredCountry[0].capital} />
      </div>
    );
  }

  if (filteredCountry.length > 1 && filteredCountry.length < 11) {
    return (
      <ul>
        {filteredCountry.map((c) => (
          <li key={c.name.common}>
            {c.name.common} <Button handleClick={() => handleClick(c)} />
          </li>
        ))}
      </ul>
    );
  }
};

export default List;
