const router = require('express').Router();
const Thought = require('../../models/thoughts');

// Find ALL Thoughts.
router.get('/Thoughts', (req, res) => {
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).send({ message: '(Thought Model) Internal Server Error' });
        }
    });
});

module.exports = router;