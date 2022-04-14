const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require('/helpers/fsUtils');
const uuid = require("/helpers/uuid");
const db = require('/db/db.json');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;
    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuid(),
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

notes.get('/:note_id', (req, res) => {
    if (req.params.note_id) {
        console.info(`${req.method} request received to show a specfic note`);
        const noteID = req.params.note_id;
        for (let i = 0; i < db.length; i++) {
            const currentNote = db[i];
            if (currentNote.note_id === noteID) {
                res.json(currentNote);
                return;
            };
        };
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    };
});

notes.delete('/:note_id', (req, res) => {
    //something
    if (req.params.note_id) {
        console.info(`${req.method} request received to delete a note`);
        const noteID = req.params.note_id;
        for (let i = 0; i < db.length; i++) {
            const currentNote = db[i];
            if (currentNote.note_id === noteID) {
                db.splice(i, 1);
                writeToFile('/db/db.json', db);
                res.json(db);
                return;
            };
        };
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    };
});

module.exports = notes;