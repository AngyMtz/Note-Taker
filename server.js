// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const fs = require('fs');
const path = require('path');

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const express = require('express');
const app = express();

//Saves all notes
const allNotes = require('./db/db.json');

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
app.get('/api/notes', (req, res) => {
  res.json(allNotes.slice(1));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//Function that will create a new note.
function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  //Saving the note in the data base file.
  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

//The notes are display on the left panel of the page.
app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, allNotes);
  res.json(newNote);
});

//Function to dellete a note from the data base db.json
function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
      let note = notesArray[i];

      if (note.id == id) {
          notesArray.splice(i, 1);
          //Afecting the db.json file
          fs.writeFileSync(
              path.join(__dirname, './db/db.json'),
              JSON.stringify(notesArray, null, 2)
          );

          break;
      }
  }
}

//deleting the note on the left side of the page.
app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, allNotes);
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
