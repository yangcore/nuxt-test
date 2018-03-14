module.exports = (app) => {
  const newsCtr = require('../pageCtr/newsCtr');
  const registerCtr = require('../pageCtr/registerCtr');
  const loginCtr = require('../pageCtr/loginCtr');
  const indexCtr = require('../pageCtr/indexCtr');
  app.use('/newCtr', newsCtr);
  app.use('/registerCtr', registerCtr);
  app.use('/loginCtr', loginCtr);
  app.use('/indexCtr', indexCtr);
};
