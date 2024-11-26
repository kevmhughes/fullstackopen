import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newNameObject.name)) {
      alert(`${newNameObject.name} is already added to phonebook`);
      return;
    } else {
      setPersons([...persons, newNameObject]);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={handleAddName}
        style={{
          display: "flex ",
          flexDirection: "column",
          gap: "4px",
          width: "150px",
        }}
      >
        <div>
          <div style={{ display: "flex", gap: "4px" }}>
            name:
            <input
              style={{ marginBottom: "4px" }}
              type="text"
              value={newName}
              onChange={handleNameChange}
              placeholder="Write a name here..."
            />
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            number:
            <input
              type="text"
              value={newNumber}
              onChange={handleNumberChange}
              placeholder="Write a number here..."
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={!newName || !newNumber}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name}: {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
