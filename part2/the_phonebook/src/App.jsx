import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // AXIOS GET => the initial state of the data is fetched from json-server using the axios-library
  useEffect(() => {
    console.log("effect");
    personService
      .getAll()
      .then((response) => {
        console.log("promise fulfilled");
        console.log("data", response.data);
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

  // AXIOS POST => Handle adding a new person to the phonebook
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
    personService
      .create(newNameObject)
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
  const handleFilteredPersons = (event) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  // AXIOS DELETE => remove the person from the server
  const handleDeletePerson = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this person?"
    );

    if (confirmDeletion) {
      personService
        .remove(id)
        .then(() => {
          console.log("Deleted person with id:", id);

          // Remove the deleted person from the list of persons
          const updatedPersons = persons.filter((person) => person.id !== id);

          // Update both persons and filteredPersons
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons); // Sync filteredPersons with updated persons list
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    } else {
      console.log("deletion cancelled");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilteredPersons={handleFilteredPersons} />
      <h2>Add a new number</h2>
      <Form
        handleAddName={handleAddName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <h2>Numbers</h2>
      <List
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
