const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");
let db = require('../db/db.json');
const { info } = require('console');

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
let newDB = [];
//look at filter method
notes.delete('/:note_id', (req, res) => {
    //something
    if (req.params.note_id) {
        console.info(`${req.method} request received to delete a note`);
        const noteID = req.params.note_id;
        newDB = db.filter(note => note.note_id !== noteID)
        console.info(db);
        console.info(newDB);
        writeToFile('./db/db.json', newDB);
        res.json(db);
        return;
        // for (let i = 0; i < db.length; i++) {
        //     const currentNote = db[i];
        //     if (currentNote.note_id === noteID) {
        //         db = db.filter(note => note.note_id !== noteID)
        //         res.json(db);
        //         return;
        //     };
        //     console.info(db);
        // };
        // writeToFile('./db/db.json', db);
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    };
});

module.exports = notes;