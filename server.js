const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//gives access to files in public folder for hosting
app.use(express.static('public'));

//get route for homepage
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//route for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);