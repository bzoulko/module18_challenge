const router = require('express').Router();
const User = require('../../models/users');

// GET all users.
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

// GET a single user.
router.get('/:_id', (req, res) => {
    const id = req.params._id;
    const errMsg = `{ msg: '${id}' - Not found! }`;

    if (id.length == 12 || id.length == 24) {
        User.find({_id: id }, (err, result) => {
            if (result.length) {
                res.status(200).json(result);
            } else {
                res.status(500).send(errMsg);
            }
        });
    } else {
        res.json(errMsg);
    }
});

// POST a new user.
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


// POST a new friend to a user.
router.post('/:userId/friends/:friendId', (req, res) => {
    // Create JSON array for bulk create when posting muliple.
    let friendId = req.params.friendId;
    let userId = req.params.userId;
    let errMsg = `{ msg: Unable to ADD: ${"User - " + userId + "  new Friend - " + friendId} }`;

    if (userId.length == 12 || userId.length == 24) {
        User.find({_id: userId }, (err, user) => {
            if (user.length) {
                User.find({_id: userId }, (err, user) => {
                    if (user.length) {
                        // Determine when more than one is being posted.
                        User.create(user)
                            .then((result) => res.json(result))
                            .catch((err) => res.json(err + " " + errMsg));
                        
                        User.updateOne({ _id: id }, { $set: req.body } )
                            .then((result) => res.json(result))
                            .catch((err) => res.json(err + " " + errMsg));
        
                    } else {
                        res.status(500).send(err + " " + errMsg);
                    }
                });
                    } else {
                res.status(500).send(err + " " + errMsg);
            }
        });
    } else {
        res.json(errMsg);
    }

});


// Updates a user by its _id.
router.put('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to UPDATE: '${id}' }`;

    User.updateOne({ _id: id }, { $set: req.body } )
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});


// Delete user by _id.
router.delete('/:_id', (req, res) => {
    let id = req.params._id;
    let errMsg = `{ msg: Unable to DELETE: '${id}' }`;

    User.deleteOne({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err + " " + errMsg));
});
  
module.exports = router;