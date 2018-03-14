const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://readWriteAnyDatabase:yc943134861@127.0.0.1:27017/craw?authSource=admin");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.info(" we're connected!");
});

exports.db = db;
