import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // GET => the initial state of the data is fetched from json-server using the axios-library.
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      console.log("data", response.data)
      setPersons(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);
  console.log("render", persons.length, "persons");

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]); // Update filteredPersons when persons change

  // Handle name change input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle number change input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // POST => Handle adding a new person to the phonebook
  const handleAddName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newNameObject.name)) {
      alert(`${newNameObject.name} is already added to phonebook`);
      return;
    } 

    // Add the new person to the server
    axios
    .post("http://localhost:3001/persons", newNameObject)
    .then((response) => {
      console.log("person added", response.data);
      // Add the new person to the list of persons in state
      setPersons([...persons, response.data]);
      setNewName("");
      setNewNumber("");
    })
    .catch((error) => {
      console.error("Error adding person:", error);
    });
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
      <List filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
