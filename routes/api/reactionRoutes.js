const router = require('express').Router();
const Reaction = require('../../models/reactions');

// Find ALL Thoughts.
router.get('/', (req, res) => {
    Reaction.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).send({ message: '(Reaction Model) Internal Server Error' });
        }
    });
});

  
module.exports = router;