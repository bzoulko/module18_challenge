const router = require('express').Router();
const User = require('../../models/users');
const Thought = require('../../models/thoughts');
const Reaction = require('../../models/reactions');


// GET (FIND) ALL Thoughts.
router.get('/', (req, res) => {
    const errMsg = `{ msg: Nothing found! }`;

    Thought.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).send(errMsg);
        }
    });
});


// GET (FIND) a single user.
router.get('/:_id', (req, res) => {
    const id = req.params._id;
    const errMsg = `{ msg: '${id}' - Not found! }`;

    if (id.length == 12 || id.length == 24) {
        Thought.findOne({_id: id }, function(err, user) {
            if (err) res.status(500).json(err + " " + errMsg);            
            res.status(200).json(user);
        });
    } else {
        res.json(errMsg);
    }
});


// POST (ADD) one or more thoughts.
router.post('/', (req, res) => {

    let body = JSON.stringify(req.body);
    let errMsg = `{ msg: Unable to ADD: ${body} }`;
    let thoughts = JSON.parse(body);
    
    // Determine when more than one is being posted.
    if (thoughts.length) {
        Thought.insertMany(thoughts)
            .then((result) => {
                UpdateAllUsersThoughts(thoughts);
                res.send(result);
            })
            .catch((err) => res.json(err + " " + errMsg));
    } else {        
        Thought.create(thoughts)
            .then((result) => {
                UpdateAUsersThought(thoughts);
                res.json(result)
            })
            .catch((err) => res.json(err + " " + errMsg));
    }

});


// Update all associated users thoughts.
function UpdateAllUsersThoughts(thoughts) {
    // Update all thoughts to all associated users.
    for (thought in thoughts) {
        UpdateAUsersThought(thought);
    }
}


// Update an associated users thought.
function UpdateAUsersThought(thought) {
    let userId = thought.userId;

    // Make sure input Id's meet the required length and locate the user.
    if (userId.length == 12 || userId.length == 24) {
        User.findOne({_id: userId }, function(err, user) {

            // Check for errors, if none, append to parent.
            if (err) res.json(err + " " + errMsg);            
            user.thoughts.push(thoughtId);

            // Update user with new a thought.
            User.updateOne({ _id: userId }, { $set: user } )
                .catch((err) => res.json(err + " " + errMsg));

        });
    }

}


// POST (UPDATE) a reaction in a thought.
router.post('/:thoughtId/reactions', (req, res) => {

    // Define input variables from POST.
    let thoughtId = req.params.thoughtId;
    let reactions = req.body;
    let errMsg = `{ msg: Unable to UPDATE: ${"Thought - " + thoughtId + "  w/Reactions - " + JSON.stringify(reactions)} }`;
    
    // Make sure input Id's meet the required length and locate the user.
    if (reactions) {        
        Thought.findOne({_id: thoughtId }, function(err, thought) {

            // Check for errors, if none, append to parent.
            if (err) res.json(err + " " + errMsg);
            thought.reactions.push(...reactions);

            // Update thought with new reaction.
            Reaction.updateOne({ _id: userId }, { $set: user })
                .then((result) => res.json(result))
                .catch((err) => res.json(err + " " + errMsg));

        });
    } else {
        res.json(errMsg);
    }

});


// PUT (UPDATE) thought by its _id.
router.put('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to UPDATE: '${id}' }`;

    Thought.updateOne({ _id: id }, { $set: req.body } )
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});


// DELETE - thought by _id.
router.delete('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to DELETE: '${id}' }`;

    Thought.deleteOne({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});


module.exports = router;