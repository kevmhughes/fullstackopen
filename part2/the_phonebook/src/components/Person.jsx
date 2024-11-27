import React from "react";
import Button from "./Button";

const Person = ({ person, handleDeletePerson }) => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <div>
        {person.name}: {person.number}
      </div>
      <Button handleDeletePerson={() => handleDeletePerson(person.id)} />
    </div>
  );
};

export default Person;
