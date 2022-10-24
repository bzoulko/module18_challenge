const router = require('express').Router();
const Reaction = require('../../models/reactions');

// GET (FIND) ALL Reactions.
router.get('/', (req, res) => {
    const errMsg = `{ msg: Nothing found! }`;

    Reaction.find({}, (err, result) => {
        if (err) res.status(500).send(err + " " + errMsg);
        res.status(200).json(result);
    });
});

  
module.exports = router;