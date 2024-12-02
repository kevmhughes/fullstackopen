import React from "react";
import Button from "./Button";

const Person = ({ person, handleDeletePerson }) => {
  return (
    <li className="list-item">
      <div className="grid-container">
        <div className="grid-item">{person.name}:</div>
        <div className="grid-item">{person.number}</div>
        <Button handleDeletePerson={() => handleDeletePerson(person.id)} />
      </div>
    </li>
  );
};

export default Person;
