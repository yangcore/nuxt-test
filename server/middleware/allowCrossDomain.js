const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '127.0.0.1');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

module.exports = allowCrossDomain;
