const chalk = require("chalk");
const yargs = require("yargs");
const { addNote, removeNote, listNotes, readNote } = require("./notes");
const fs = require("fs");

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      descibe: "meat and juices of each note",
      demandOption: true,
      type: "string",
    },
  },
  handler(agrv) {
    addNote(agrv.title, agrv.body);
  },
});
yargs.command({
  command: "remove",
  describe: "remove note",
  builder: {
    title: {
      describe: "title to be removed",
      demandOption: true,
      type: "stirng",
    },
  },
  handler(agrv) {
    removeNote(agrv.title);
  },
});

yargs.command({
  command: "list",
  describe: "lists out notes",
  handler() {
    listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "read your notes!",
  builder: {
    title: {
      describe: "title of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler(agrv) {
    readNote(agrv.title);
  },
});

yargs.parse();
