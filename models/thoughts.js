// Define mongoose for schema creation.
const mongoose = require('mongoose');
const reactions = require("./reactions");
const ObjectId = mongoose.Types.ObjectId;

console.log("Before schema setup (Thought)");

// Build Schema.
const thoughtSchema = new mongoose.Schema({
  thoughtText:  { type: String, required: true, minlength: 1, maxlength: 128 },
  createdAt:    { type: Date, default: Date.now, get: (date) => date.toDateString() },
  username:     { type: String, required: true },
  reactions:    [{type: ObjectId, ref: reactions.modelName, populate: true}],
  reactionCount:{ type: Number, default: 0, ref: 'Thought', count: true, populate: true }
  // reactionCount:{ type: Number, default: 0, count: true /* , get: userModel.countDocuments({name: 'anand'}, function(err, c) { console.log('Count is ' + c); }) */}
}, {
  toObject:     { populate: true },
  timestamps:   true,
  toJSON:       { getters: true, virtuals: true }
});

console.log("After schema setup (Thought)");

// Uses mongoose.model() to create model
const Thought = mongoose.model('Thought', thoughtSchema);

// Error handler for seeding data.
const handleError = (err) => console.error(err);

// Only add the seeds if the collection is empty.
Thought.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        // Create JSON entry w/seeds.
        Thought.create(
            {
                thoughtText: 'This is my first thought.',
                username: 'Brian Zoulko',
            },
            (err) => (err ? handleError(err) : console.log('Created new Thought (Seeds) document'))
        );
    }
});

module.exports = Thought;