// Import server connection settings and database models.
const db = require('./config/connection');
const { User, Thought, Reaction } = require('./models');

// Import express setup.
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Create Express Application.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/Users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: '(User Model) Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/Thoughts', (req, res) => {
  Thought.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: '(Thought Model) Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/Reactions', (req, res) => {
  Reaction.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: '(Reaction Model) Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Start server application listening.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}!`);
  });
});
