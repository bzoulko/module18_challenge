const router = require('express').Router();
const User = require('../../models/users');

// Find ALL Users.
router.get('/', (req, res) => {
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).send({ message: '(User Model) Internal Server Error' });
        }
    });
});

module.exports = router;