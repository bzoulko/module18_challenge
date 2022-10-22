// Import models.
const User = require('./users');
const Thought = require('./thoughts');
const Reaction = require('./reactions');

// Error handler for seeding data.
const handleError = (err) => console.error(err);

// Create JSON entry w/seeds.
User.create(
    {
        username: 'Brian Zoulko',
        email: 'bzoulko@gmailcom',
    },
    (err) => (err ? handleError(err) : console.log('Created new (User) document'))
);

// Create JSON entry w/seeds.
Thought.create(
    {
        thoughtText: 'This is my first thought.',
        username: 'Brian Zoulko',
    },
    (err) => (err ? handleError(err) : console.log('Created new (Thought) document'))
);

  
// Create JSON entry w/seeds.
Reaction.create(
    {
        reactionBody: 'Wow what a thought.',
        username: 'Brian Zoulko',
    },
    (err) => (err ? handleError(err) : console.log('Created new (Reaction) document'))
);  

// Export models.
module.exports = { User, Thought, Reaction };
