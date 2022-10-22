// Define mongoose for schema creation.
const mongoose = require('mongoose');
const Reaction = require("./reactions");

// Build Schema.
const thoughtSchema = new mongoose.Schema({
  thoughtText:  { type: String, required: true, minlength: 1, maxlength: 128 },
  createdAt:    { type: Date, default: new Date.toDateString, get: (date) => date.toDateString() },
  username:     { type: String, required: true },
  reactions:    [Reaction.reactionSchema]
}, {
  timestamps:   true,
  toJSON:       { getters: true, virtuals: true },
});

// Uses mongoose.model() to create model
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = { Thought };