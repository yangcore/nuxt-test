const {Nuxt, Builder} = require('nuxt');
const config = require('../nuxt.config');
const nuxt = new Nuxt(config);
module.exports = function (app) {
  app.use(nuxt.render);
  if (config.dev) {
    new Builder(nuxt).build()
      .then(listen)
      .catch((error) => {
        console.error(error);
        process.exit(1)
      })
  } else {
    listen()
  }

  function listen() {
    const server = app.listen(3030, function () {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`Example app listening at http://127.0.0.1:${port}`, host, port);
    });
  }
};



