const express = require('express');
const api = express.Router();
const notes = require('./notesRouter');

api.use('/notes', notes);

module.exports = api;