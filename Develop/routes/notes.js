const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("../helpers/uuid");
const db = require('../db/db.json')

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

notes.get('/:id', (req, res) => {
    console.info(`${req.method} request received to show a specfic note`);

});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    //something
    if (req.params.note_id) {
        
        // const noteID = req.params.note_id;
        // const indexOfID = db.findIndex(object => {
        //     return object.note_id === noteID;
        // });
        // db.splice(indexOfID, 1);
        // res.json(db);
        // for (let i = 0; i < db.length; i++) {
        //   const currentNote = db[i];
        //   if (currentNote.note_id === noteID) {
        //     db.splice(i, 1);
        //     res.json(db);
        //     return;
        //   }
        // }
        res.status(404).send('Review not found');
      } 
    //   else {
    //     res.status(400).send('Review ID not provided');
    //   }
});

module.exports = notes;