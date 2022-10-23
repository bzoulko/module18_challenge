// Define mongoose for schema creation.
const mongoose = require('mongoose');
const thoughts = require("./thoughts");
const ObjectId = mongoose.Types.ObjectId;
const userModelName = 'User';

console.log("Before schema setup (Users)");

// Build User Schema.
const userSchema = new mongoose.Schema({
  username:     { type: String, unique: true, required: true, trim: true},
  email:        { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
  
  thoughts:     [{type: ObjectId, ref: thoughts.modelName, localField: '_id', foreignField: '_id', populate: true}],
  friends:      [{type: ObjectId, ref: userModelName, localField: '_id', foreignField: '_id', populate: true}],
  friendCount:  { type: Number, default: 0, ref: userModelName, localField: '_id', foreignField: '_id', count: true, populate: true}

  // thoughts:     [{type: ObjectId, ref: thoughts.modelName}],
  // friends:      [{type: ObjectId, ref: userModelName, localField: '_id'}],
  // friendCount:  { type: Number, default: 0, ref: userModelName, localField: '_id', count: true}
},{
  toObject: { 
    transform: function (doc, ret) {
      delete ret._id;
    }
  },
  toJSON:       { virtuals: true }
});
// friendCount:  { type: Number, default: 0, get: userModel.countDocuments({name: 'anand'}, function(err, c) { console.log('Count is ' + c); })}

//  var mongoose = require('mongoose');
//  var db = mongoose.connect('mongodb://localhost/myApp');
//  var userSchema = new mongoose.Schema({name:String,password:String});
//  var userModel = db.model('userlists',userSchema);
//  var anand = new userModel({ name: 'anand', password: 'abcd'});
//  anand.save(function (err, docs) {
//    if (err) {
//        console.log('Error');
//    } else {
//        userModel.countDocuments({name: 'anand'}, function(err, c) {
//            console.log('Count is ' + c);
//       });
//    }
//  }); 

// Uses mongoose.model() to create model.
const User = mongoose.model(userModelName, userSchema);


// // Function obtained from GistURL: https://gist.github.com/GSchutz/100358d4a614b563da29e72c5f8cd5e9
// /**
//  * Method for create recursively (tree) structure in self referenced mongoose
//  * Model
//  * 
//  * @param  {constructor} model A mongoose.model instance for schema
//  *                             validation
//  * @param  {Object}      obj   The plain object to be inserted
//  * @param  {String}      field The field of the obj/Model
//  * 
//  * @return {model}  An instance of the Model 'model'
//  */
// function recursive_reference(model, obj, field) {
//   if(obj[field] && obj[field].length) {
//     var newObjs = []
//     obj[field].forEach(function(d) {
//       newObjs.push( recursive_reference(model, d, field) );
//     });
//     obj[field] = newObjs
//   }
//   return new model(obj)
// }

// // Apply self-reference on friends.
// userSchema.pre('save', function(next) {
//   if (this.isNew) recursive_reference(User, this, "friends")
//   next();
// });

console.log("After schema setup (Users)");


// var mongoose = require('mongoose');
//  var db = mongoose.connect('mongodb://localhost/myApp');
//  var userSchema = new mongoose.Schema({name:String,password:String});
//  var userModel =db.model('userlists',userSchema);
//  var anand = new userModel({ name: 'anand', password: 'abcd'});
//  anand.save(function (err, docs) {
//    if (err) {
//        console.log('Error');
//    } else {
//        userModel.countDocuments({name: 'anand'}, function(err, c) {
//            console.log('Count is ' + c);
//       });
//    }
//  }); 

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
