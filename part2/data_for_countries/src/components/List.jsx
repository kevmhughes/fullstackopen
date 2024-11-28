import React from "react";
import Message from "./Message";
import Button from "./Button";

const List = ({
  filteredCountry,
  message,
  handleClick,
  toggleShowButton,
  showCountry,
}) => {
  // If there is a message (e.g., search results are too many or no results),
  // display the message component with the provided message.
  if (message) {
    return <Message message={message} />;
  }

  // If only one country matches the search term, display the country's full details.
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

  // If there are multiple countries matching the search term,
  // show the list of country names with a button to toggle showing full details.
  if (toggleShowButton) {
    return (
      <div>
        {filteredCountry.map((item) => (
          <div key={item.name.common}>
            {item.name.common}{" "}
            <Button
              handleClick={() => handleClick(item)}
              toggleShowButton={toggleShowButton}
            />
          </div>
        ))}
      </div>
    );
  }

  // display the details of the selected country.
  if (!toggleShowButton) {
    return (
      <div>
        <div>
          <h1>{showCountry.name.common}</h1>
          <div>capital(s): </div>
          <ul>
            {Object.values(showCountry.capital).map((city) => (
              <li key={`${showCountry.cca3}-${city}`}>{city}</li>
            ))}
          </ul>
          <div>area: {showCountry.area} km²</div>
          <div>language(s): </div>
          <ul>
            {Object.values(showCountry.languages).map((language) => (
              <li key={`${showCountry.cca3}-${language}`}>{language}</li>
            ))}
          </ul>
          <img src={showCountry.flags.png} alt={showCountry.flags.alt} />
        </div>
        <Button
          handleClick={() => handleClick()}
          toggleShowButton={toggleShowButton}
        />
      </div>
    );
  }
};

export default List;
