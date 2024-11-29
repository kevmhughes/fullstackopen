const express = require("express");
const time = require("./time");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const timestamp = time.getFormattedTimestamp();

app.get("/", (req, res) => {
  try {
    res.status(200).send("<h1>Hello World!</h1>");
  } catch (error) {
    // If an error occurs, send a 500 status code (Internal Server Error)
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/persons", (req, res) => {
  try {
    res.status(200).json(persons);
  } catch (error) {
    // If an error occurs, send a 500 status code (Internal Server Error)
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
});

app.get("/api/info", (req, res) => {
  try {
    if (persons.length === 1) {
      res.status(200).send(`
        <h1>Phonebook has info for ${persons.length} person</h1>
        <p>${timestamp}</p>`);
    }

    if (persons.length > 1) {
      res.status(200).send(`
        <h1>Phonebook has info for ${persons.length} persons</h1>
        <p>${timestamp}</p>`);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the information" });
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personData = persons.find((person) => person.id === id);
  try {
    // Check if the person was found
    if (!personData) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(personData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  try {
    const id = req.params.id;
    const personIndex = persons.findIndex((person) => person.id === id);
    // If person with that ID is not found
    if (personIndex === -1) {
      return res.status(404).json({ error: `Person with id ${id} not found` });
    }
    persons = persons.filter((person) => person.id !== id);

    res.status(204).json({ message: `Person with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the data" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
