var mongoose = require('mongoose');
var usersSchema = mongoose.Schema({
  userName: String,
  pass: String
});
exports.users = mongoose.model('users', usersSchema);
