process.env.DEBUG = 'nuxt:*';
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
const app = express();
var bodyParser = require('body-parser');
const db = require('./mogodb/mongo').db;
const store = new MongoDBStore(
  {
    url: 'mongodb://readWriteAnyDatabase:yc943134861@127.0.0.1:27017/craw?authSource=admin',
    collection: 'mySessions',
    autoRemove: 'native', // 自动移除过期的session
    stringify: false,
    touchAfter: 24 * 3600 // 懒惰的会话更新不希望在用户刷新页面的每一次都重新保存数据库上的所有会话，则可以通过限制一段时间来延迟更新会话
  });
const routerCtr = require('./routerCtr/routerCtr');
const allowCrossDomain = require('./middleware/allowCrossDomain');
app.use(allowCrossDomain);
app.use(bodyParser.json()); // 添加之后才能用req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(session({
  name: "mySessions", // 用来对session id相关的cookie进行签名
  secret: 'keyboard cat', //通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: false, //// 强制更新 session,如果不修改就不创建新的
  saveUninitialized: true, // 设置为 true，强制创建一个 session，即使用户未登录 // 貌似必须设置成true的不然多个浏览器会共享一个session
  store: store, // 存储到数据库中
  rolling: true, // 如果一直在操作，会根据当前时间重新设置cookie和session的过期时间（以当前时间为准+maxAge）
  cookie: {
    // domain: "/", // 域名
    secure: "auto",  // 需要用到https
    maxAge: 1800000 // 30分钟过期时间
  }
}));

routerCtr(app);
require('./nuxtServe')(app);
require('./Ctr/ClimbingSina');



