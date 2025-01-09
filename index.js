const express = require("express");
const app = express();

app.use(express.json());

let contacts = [
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

app.get("/info", (req, res) => {
  const amount = contacts.length;
  const now = new Date();
  res.send(`Phonebook has info for ${amount} people<br /><br />${now}`);
});

app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.post("/api/persons", (req, res) => {
  const newContact = {
    id: Math.floor(Math.random() * 1e6).toString(),
    ...req.body,
  };

  if (!newContact.name || !newContact.number) {
    return res.status(400).json({
      error: "Name or number missing",
    });
  }

  if (contacts.some((c) => c.name === newContact.name)) {
    return res.status(409).json({
      error: "Name already exists",
    });
  }

  contacts = [...contacts, newContact];

  res.json(newContact);
});

app.get("/api/persons/:id", (req, res) => {
  const person = contacts.find((c) => c.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  contacts = contacts.filter((c) => c.id !== req.params.id);
  res.status(204).end();
});

app.listen(3001);
