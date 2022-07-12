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

    const { title, text } = req.body;
    if (title && text) {
        const newNotes = {
            title,
            text,
            notes_id: uuidv4(),
        };
        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes,
        };

        res.json(response);
    } else {
        res.json('Error in posting notes');
    }
});

//DELETE Route for removing a note
notes.delete('/:notes_id', (req, res) => {
    
    const { notes_id } = req.params;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
        .then((json) => {
            const newNotes = json.filter((item) => item.notes_id !== notes_id);

            writeToFile('./db/db.json', newNotes);

            res.json(`Note ${notes_id} was successfully deleted.`);
        })

});


module.exports = notes;