import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
    };

    if (persons.some((person) => person.name === newNameObject.name)) {
      alert(`${newNameObject.name} is already added to phonebook`);
      return;
    } else {
      setPersons([...persons, newNameObject]);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name:
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder="Write a name here..."
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
