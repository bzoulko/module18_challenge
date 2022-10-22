// Define mongoose for schema creation.
const mongoose = require('mongoose');
const Thought = require("./thoughts");

// Build User Schema.
const userSchema = new mongoose.Schema({
  username:     { type: String, unique: true, required: true, trim: true},
  email:        { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
  thoughts:     [Thought.thoughtSchema],
  friends:      [userSchema],
  friendCount:  { type: Number, default: 0 /* , get: userModel.countDocuments({name: 'anand'}, function(err, c) { console.log('Count is ' + c); }) */}
});

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

// Uses mongoose.model() to create model.
const User = mongoose.model('User', userSchema);
module.exports = { User };
