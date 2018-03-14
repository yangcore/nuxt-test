const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://readWriteAnyDatabase:yc943134861@111.231.89.222:27017/craw?authSource=admin");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.info(" we're connected!");
});

exports.db = db;
