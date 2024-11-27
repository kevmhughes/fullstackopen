import React from "react";
import Person from "./Person";

const List = ({ filteredPersons, handleDeletePerson }) => {
  if (!Array.isArray(filteredPersons)) {
    return <div>Error: filteredPersons is not an array!</div>;
  }

  return (
    <>
      {filteredPersons.map((person) => (
        <Person
          person={person}
          key={person.name}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </>
  );
};

export default List;
