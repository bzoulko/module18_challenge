// Define mongoose for schema creation.
const mongoose = require('mongoose');

// Build Reactions Schema.
const reactionSchema = new mongoose.Schema({
    reactionId:   { type: ObjectId, default: new ObjectId },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username:     { type: String, required: true },
    createdAt:    { type: Date, default: new Date.toDateString, get: (date) => date.toDateString() },
    ReactionCount:{ type: Number, default: 0 /* , get: userModel.countDocuments({name: 'anand'}, function(err, c) { console.log('Count is ' + c); }) */}
})

// Uses mongoose.model() to create model
const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = { Reaction };