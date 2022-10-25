const router = require('express').Router();
const Reaction = require('../../models/reactions');
const Thought = require('../../models/thoughts');

// GET (FIND) ALL Reactions.
router.get('/', (req, res) => {
    const errMsg = `{ msg: Nothing found! }`;

    Reaction.find({}, (err, result) => {
        if (err) res.status(500).send(err + " " + errMsg);
        res.status(200).json(result);
    });
});


// POST (ADD) one or more reactions.
router.post('/', (req, res) => {

    let body = JSON.stringify(req.body);
    let errMsg = `{ msg: Unable to ADD: ${body} }`;
    let reactions = JSON.parse(body);
    
    // Determine when more than one is being posted.
    if (reactions.length) {
        Reaction.insertMany(reactions)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => res.json(err + " " + errMsg));
    } else {        
        Reaction.create(reactions)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json(err + " " + errMsg));
    }

});


// DELETE - reaction by _id.
router.delete('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to DELETE: '${id}' }`;

    // Remove reaction.
    Reaction.deleteOne({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
    
    // Remove any reaction id referrenced in thoughts.
    let thoughts = Thought.find({ reactions: id });
    if (thoughts) {
        for (let thought in thoughts) {
            if (thought && thought.reactions) {
                console.log("thought: " + thought);
                console.log("thought.reactions: " + thought.reactions);
                let index = thought.reactions.indexOf(id);
                if (index > -1) {
                    thought.reactions.slice(index, 1);
                    Thought.updateOne({ _id: thought._id }, { $set: thought });
                }
            }
        }
    }

});

module.exports = router;