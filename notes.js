const fs = require("fs");
const chalk = require("chalk");

const errorMsg = chalk.black.bgRed;
const successMsg = chalk.green.inverse;

debugger;

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(successMsg("Note Added!"));
  } else {
    console.log(errorMsg("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  saveNotes(notesToKeep);
  notes.length !== notesToKeep.length
    ? console.log(successMsg("Note Removed!"))
    : console.log(errorMsg("No note found!"));
};

const titleStyle = chalk.bold.bgBlue.underline;
const listNotes = () => {
  console.log(titleStyle("Your Notes:"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.yellow.underline(note.title));
    console.log(chalk.magenta(note.body));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title);
  noteToRead
    ? console.log(chalk.inverse(noteToRead.body))
    : console.log(errorMsg("Could not find note"));
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
