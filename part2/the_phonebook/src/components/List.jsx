import React from "react";
import Person from "./Person";

const List = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person person={person} key={person.name}/>
      ))}
    </>
  );
};

export default List;
