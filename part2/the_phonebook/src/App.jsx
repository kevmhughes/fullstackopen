import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // Handle name change input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle number change input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Handle adding a new person to the phonebook
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
      setFilteredPersons([...persons, newNameObject]);
    }
  };
  
  // Handle filtering the phonebook by name 
  const handleFilteredPersonsListChange = (event) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilteredPersonsListChange={handleFilteredPersonsListChange}
      />
      <h2>Add a new number</h2>
      <Form
        handleAddName={handleAddName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <h2>Numbers</h2>
      <List filteredPersons={filteredPersons}/>
    </div>
  );
};

export default App;
