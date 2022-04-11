const express = require('express');
const api = express.Router();
const notes = require('./notesRouter');

api.use('/tips', notes);

module.exports = api;