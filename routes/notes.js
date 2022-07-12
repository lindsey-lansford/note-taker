const notes = require('express').Router();
//module that gives each note a unique id when it's saved
const { v4: uuidv4 } = require('uuid');
//bringing in the helper functions
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for posting notes
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    if (req.body) {
        const newNotes = {
            title,
            text,
            id: uuidv4()
        }

        readAndAppend(newNotes, './db/db.json');

        res.json('Notes📝 successfully added');
    } else {
        res.error('Error in posting notes');
    }
});

//DELETE Route for removing a note
notes.delete('/:id', (req, res) => {
    
    const notesId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notes except the one with the ID provided in the URL
            const result = json.filter((item) => item.id !== notesId);
            // Save that array to the filesystem
            writeToFile('./db/db.json', result);
            // Respond to the DELETE request
            res.json(`Item ${notesId} has been deleted 🗑️`);
        })
        .catch((err) => {
            console.log(`Error in deleting note: ${err}`);
    })
});


module.exports = notes;