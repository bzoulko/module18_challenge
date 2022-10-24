// Define mongoose for schema creation.
const mongoose = require('mongoose');
const thoughts = require("./thoughts");
const ObjectId = mongoose.Types.ObjectId;
const userModelName = 'User';
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

console.log("Before schema setup (Users)");

// Build User Schema.
const userSchema = new mongoose.Schema({
  username:     { type: String, unique: true, required: true, trim: true},
  email:        { type: String, required: true, unique: true, match: emailRegex},  
  thoughts:     [{type: ObjectId, ref: thoughts.modelName, localField: '_id', foreignField: '_id', populate: true}],
  friends:      [{type: ObjectId, ref: userModelName, localField: '_id', foreignField: '_id', populate: true}],
},{
  toObject: { 
    transform: function (doc, ret) {
      delete ret._id;
    }
  },
  toJSON:       { virtuals: true }
});

// Create a virtual property `friendCount` that gets the amount of friends per user.
userSchema.virtual('friendCount').get(() => this.friends.length);

// Uses mongoose.model() to create model.
const User = mongoose.model(userModelName, userSchema);

console.log("After schema setup (Users)");

// Error handler for seeding data.
const handleError = (err) => console.error(err);

// Only add the seeds if the collection is empty.
User.find({}).exec(async (err, collection) => {
  
  if (collection.length === 0) {
    // Create JSON entry w/seeds.
    User.create(
      {
        username: 'Brian Zoulko',
        email: 'bzoulko@gmail.com',
      },
      (err) => (err ? handleError(err) : console.log('Created new User (Seeds) document'))
    );
  }

});

module.exports = User;
