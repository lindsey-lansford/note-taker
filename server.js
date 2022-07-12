const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON
app.use(express.json());
// This middleware will parse that string into an object containing key value pairs
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
//static files
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Wildcard route to direct users to the 404 page
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'))
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});