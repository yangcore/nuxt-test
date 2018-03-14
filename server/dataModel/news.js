var mongoose = require('mongoose');
var newsSchema = mongoose.Schema({
  news: String,
  title: String,
  type: Number,
  date: String
});
exports.News = mongoose.model('News', newsSchema);
