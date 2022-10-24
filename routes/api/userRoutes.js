const router = require('express').Router();
const User = require('../../models/users');


// GET (FIND) all users.
router.get('/', (req, res) => {
    const errMsg = `{ msg: Nothing found! }`;

    User.find({}, (err, result) => {
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
        User.findOne({_id: id }, function(err, user) {
            if (err) res.status(500).json(err + " " + errMsg);            
            res.status(200).json(user);
        });
    } else {
        res.json(errMsg);
    }
});


// POST (ADD) one or more users.
router.post('/', (req, res) => {
    // Create JSON array for bulk create when posting muliple.
    let body = JSON.stringify(req.body);
    let errMsg = `{ msg: Unable to ADD: ${body} }`;
    let users = JSON.parse(body);

    // Determine when more than one is being posted.
    if (users.length) {
        User.insertMany(users)
            .then((result) => res.send(result))
            .catch((err) => res.json(err + " " + errMsg));
    } else {        
        User.create(users)
            .then((result) => res.json(result))
            .catch((err) => res.json(err + " " + errMsg));
    }
});


// POST (UPDATE) a new friend to a user.
router.post('/:userId/friends/:friendId', (req, res) => {

    // Define input variables from POST.
    let friendId = req.params.friendId;
    let userId = req.params.userId;
    let errMsg = `{ msg: Unable to ADD: ${"User - " + userId + "  new Friend - " + friendId} }`;
    
    // Make sure input Id's meet the required length and locate the user.
    if (userId.length == 12 || userId.length == 24) {
        User.findOne({_id: userId }, function(err, user) {

            // Check for errors, if none, append to parent.
            if (err) res.json(err + " " + errMsg);            
            user.friends.push(friendId);

            // Update user with new a friend.
            User.updateOne({ _id: userId }, { $set: user } )
                .then((result) => res.json(result))
                .catch((err) => res.json(err + " " + errMsg));

        });
    } else {
        res.json(errMsg);
    }

});


// POST (UPDATE) a new Thought to a user.
router.post('/:userId/thoughts/:thoughtId', (req, res) => {

    // Define input variables from POST.
    let thoughtId = req.params.thoughtId;
    let userId = req.params.userId;
    let errMsg = `{ msg: Unable to ADD: ${"User - " + userId + "  new Thought - " + thoughtId} }`;
    
    // Make sure input Id's meet the required length and locate the user.
    if (userId.length == 12 || userId.length == 24) {
        User.findOne({_id: userId }, function(err, user) {

            // Check for errors, if none, append to parent.
            if (err) res.json(err + " " + errMsg);            
            user.thoughts.push(thoughtId);

            // Update user with new a thought.
            User.updateOne({ _id: userId }, { $set: user } )
                .then((result) => res.json(result))
                .catch((err) => res.json(err + " " + errMsg));

        });
    } else {
        res.json(errMsg);
    }

});


// PUT (UPDATE) user by its _id.
router.put('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to UPDATE: '${id}' }`;

    User.updateOne({ _id: id }, { $set: req.body } )
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});


// DELETE - user by _id.
router.delete('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to DELETE: '${id}' }`;

    User.deleteOne({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});


// DELETE - friend from a user.
router.delete('/:userId/friends/:friendId', (req, res) => {

    // Define input variables from POST.
    let friendId = req.params.friendId;
    let userId = req.params.userId;
    let errMsg = `{ msg: Unable to DELETE: ${"User - " + userId + "  new Friend - " + friendId} }`;

    // Make sure input Id's meet the required length and locate the user.
    if (userId.length == 12 || userId.length == 24) {
        User.findOne({ _id: userId }, function (err, user) {

            // Check for errors, if none, append to parent.
            if (err) res.json(err + " " + errMsg);
            
            // Locate index of item to remove.
            const index = user.friends.indexOf(friendId);

            if (index > -1) {
                user.friends.splice(index, 1); 

                // Update user with new friends list
                User.updateOne({ _id: userId }, { $set: user })
                    .then((result) => res.json(result))
                    .catch((err) => res.json(err + " " + errMsg));                    
            } else {
                res.json(errMsg);
            }

        });
    } else {
        res.json(errMsg);
    }

});


// DELETE - thought from a user.
router.delete('/:userId/thoughts/:thoughtId', (req, res) => {

    // Define input variables from POST.
    let thoughtId = req.params.thoughtId;
    let userId = req.params.userId;
    let errMsg = `{ msg: Unable to DELETE: ${"User - " + userId + "  new Thought - " + thoughtId} }`;

    // Make sure input Id's meet the required length and locate the user.
    if (userId.length == 12 || userId.length == 24) {
        User.findOne({ _id: userId }, function (err, user) {

            // Check for errors, if none, append to parent.
            if (err) res.json(err + " " + errMsg);
            
            // Locate index of item to remove.
            const index = user.thoughts.indexOf(thoughtId);

            if (index > -1) {
                user.thoughts.splice(index, 1); 

                // Update user with new thought list
                User.updateOne({ _id: userId }, { $set: user })
                    .then((result) => res.json(result))
                    .catch((err) => res.json(err + " " + errMsg));                    
            } else {
                res.json(errMsg);
            }

        });
    } else {
        res.json(errMsg);
    }

});


module.exports = router;