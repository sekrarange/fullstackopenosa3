const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://sekrarange:${password}@fullstackopen.yie8t.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Fullstackopen`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber,
  });
  person.save().then((res) => {
    console.log(`added ${res.name} number ${res.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((res) => {
    console.log("phonebook:");
    for (const result of res) {
      console.log(`${result.name} ${result.number}`);
    }
    mongoose.connection.close();
  });
}
