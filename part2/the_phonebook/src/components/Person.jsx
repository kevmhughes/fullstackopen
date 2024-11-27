import React from "react";
import Button from "./Button";

const Person = ({ person, handleDeletePerson }) => {
  return (
    <li style={{ display: "flex", gap: "4px" }}>
        {person.name}: {person.number}
      <Button handleDeletePerson={() => handleDeletePerson(person.id)} />
    </li>
  );
};

export default Person;
