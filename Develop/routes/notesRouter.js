const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { noteText, noteTitle } = req.body;
    if (noteText && noteTitle) {

        const newNote = {
            noteText,
            noteTitle,
            note_id: uuid(),
        };
        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'Note Saved',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error in Saving Note');
    }
});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    //something
});

module.exports = notes;