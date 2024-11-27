import React from "react";
import Message from "./Message";

const List = ({ filteredCountry, message }) => {
  if (message) {
    return <Message message={message} />;
  }

  if (filteredCountry.length === 1) {
    return (
      <div>
        {filteredCountry.map((item) => (
          <div key={item.cca3}>
            <div>
              <h1>{item.name.common}</h1>
              <div>capital(s): </div>
              <ul>
                {Object.values(item.capital).map((city) => (
                  <li key={`${item.cca3}-${city}`}>{city}</li>
                ))}
              </ul>
              <div>area: {item.area} km²</div>
              <div>language(s): </div>
              <ul>
                {Object.values(item.languages).map((language) => (
                  <li key={`${item.cca3}-${language}`}>{language}</li>
                ))}
              </ul>
              <img src={item.flags.png} alt={item.flags.alt} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {filteredCountry.map((item) => (
        <div key={item.name.common}>{item.name.common}</div>
      ))}
    </div>
  );
};

export default List;
