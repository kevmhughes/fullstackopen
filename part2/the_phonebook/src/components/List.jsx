import React from "react";
import Person from "./Person";

const List = ({ filteredPersons, handleDeletePerson }) => {
  if (!Array.isArray(filteredPersons)) {
    return <div>Error: filteredPersons is not an array!</div>;
  }
  console.log(filteredPersons)
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person
          key={person.name}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default List;
