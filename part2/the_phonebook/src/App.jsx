import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageCSS, setMessageCSS] = useState("");
  // this is to trigger getAll useEffect when adding contact to DB
  const [addedToDb, setAddedToDb] = useState(false);

  // Set a timeout to reset the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setMessageCSS("");
      }, 3000);
      return () => clearTimeout(timeout); // Cleanup the timeout when the component unmounts or when message changes
    }
  }, [message]); // Runs only when the message changes

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
  }, [addedToDb]);

  useEffect(() => {
    setFilteredPersons(persons);
    setAddedToDb(false);
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
      const foundPerson = persons.find(
        (person) => person.name === newNameObject.name
      );

      const confirmUpdate = window.confirm(
        `${newNameObject.name} is already in the phonebook, replace the old number with a new one?`
      );

      // check to see if the user wants to update the contact number
      if (confirmUpdate) {
        const id = foundPerson.id;
        const newObject = {
          name: foundPerson.name,
          number: newNameObject.number,
        };
        updateName(id, newObject);
      } else {
        console.log("Update cancelled");
        return;
      }
    } else {
      // AXIOS POST => add the new person object to the DB
      personService
        .create(newNameObject)
        .then((response) => {
          setPersons([...persons, response.data]);
          setAddedToDb(true);
          setNewName("");
          setNewNumber("");
          setMessageCSS("successMessage");
          setMessage(`${response.data.name} has been added to the phonebook.`);
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          console.error("Error adding person:", error);
          setMessageCSS("errorMessage");
          setMessage(`Error adding ${response.data.name}.`);
        });
    }
  };

  // AXIOS PUT => update the contact's phone number
  const updateName = (id, newObject) => {
    personService
      .update(id, newObject)
      .then((modifiedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : modifiedPerson))
        );
        setAddedToDb(true);
        setNewName("");
        setNewNumber("");
        setMessageCSS("successMessage");
        setMessage(
          `The number for ${newObject.name} has been updated successfully.`
        );
      })
      .catch((error) => {
        console.error("Error updating person:", error);
        setMessageCSS("errorMessage");
        setMessage(`Error updating the number for ${newObject.name}.`);
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
      const foundPerson = persons.find((person) => person.id === id);
      personService
        .remove(id)
        .then(() => {
          // Remove the deleted person from the list of persons
          const updatedPersons = persons.filter((person) => person.id !== id);

          // Update both persons and filteredPersons
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons); // Sync filteredPersons with updated persons list
          setMessageCSS("successMessage");
          setMessage(
            `${foundPerson.name} has been deleted from the phonebook.`
          );
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setMessageCSS("errorMessage");
          setMessage(`Error deleting ${foundPerson.name}.`);
        });
    } else {
      console.log("deletion cancelled");
    }
  };

  return (
    <div className="container wrapper title">
      <h2>Phonebook</h2>
      <Notification message={message} messageCSS={messageCSS} />
      <Filter handleFilteredPersons={handleFilteredPersons} />
      <div>
        <h2 className="title">Add a new number</h2>
        <Form
          handleAddName={handleAddName}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          newNumber={newNumber}
          newName={newName}
        />
      </div>
      <div>
        <h2 className="title">Numbers</h2>
        <List
          filteredPersons={filteredPersons}
          handleDeletePerson={handleDeletePerson}
        />
      </div>
    </div>
  );
};

export default App;
