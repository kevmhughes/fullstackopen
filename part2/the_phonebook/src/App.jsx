import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";
import Notification from "./components/Notification";
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  

  // AXIOS GET => the initial state of the data is fetched from json-server using the axios-library
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  // Handle adding a new person to the phonebook/updating a number of an existing person
  const handleAddName = (event) => {
    event.preventDefault();

    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    // See if the name already exists in the DB
    if (persons.some((person) => person.name === newNameObject.name)) {
      // Get the person object if found in the DB
      const foundPerson = persons.find(
        (person) => person.name === newNameObject.name
      );
      // Modify the phone number of the found person object
      const confirmUpdate = window.confirm(
        `${newNameObject.name} is already added to the phonebook, replace the old number with a new one?`
      );

      // AXIOS PUT => update the person object in the DB
      if (confirmUpdate) {
        const updatedPerson = { ...foundPerson, number: newNameObject.number };
        personService
          .update(foundPerson.id, updatedPerson)
          .then((response) => {
            console.log("Person updated:", response.data);
            // Update the local state with the new data
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage("The number has been updated successfully!")
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
        return;
      } else {
        // If user cancels the update, do nothing
        console.log("Update cancelled");
        return;
      }
    } else {
      // AXIOS POST => add the new person object to the DB
      personService
        .create(newNameObject)
        .then((response) => {
          console.log("person added", response.data);
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
          setMessage(`${response.data.name} has been added to the phonebook!`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }
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
      <Notification message={message}/>
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
