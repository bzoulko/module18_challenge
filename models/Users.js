const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({

});

const reactionSchema = new mongoose.Schema({
  reactionId: { type: ObjectId, default: new ObjectId },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: new Date.toDateString, get: (date) => date.toDateString() }
})

const thoughtsSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 128 },
  createdAt: { type: Date, default: new Date.toDateString, get: (date) => date.toDateString() },
  username: { type: String, required: true },
  reaction: [reactionSchema]
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true},
  email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
  thoughts: [thoughtsSchema],
  friends: [userSchema],
});

var PersonSchema = new Schema({
  name: {
      first: String
    , last: String
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


const User = mongoose.model('user', userSchema);

const handleError = (err) => console.error(err);

// TODO: Add a comment describing the functionality of the code below
Book.create(
  {
    title: 'Diary of Anne Frank',
    author: 'Anne Frank',
    publisher: 'Scholastic',
    stockCount: 10,
    price: 10,
    inStock: true,
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

// TODO: Add a comment describing the difference between this instance being created
// and the instance that was created above
Book.create(
  { title: 'Oh the Places You Will Go!', author: 'Dr. Seuss' },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

// TODO: Add a comment describing the difference between this instance being created
// and the instance that was created above
Book.create({ title: 'Harold and the Purple Crayon' }, (err) =>
  err ? handleError(err) : console.log('Created new document')
);

module.exports = Book;
