const router = require('express').Router();
const users = require("../dataModel/users").users;
const crypto = require('crypto');
router.post("/login", (req, res) => {
  const userInfo = req.body;
  let userPwd = userInfo.pass;
  const md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列,此处所示为MD5方式加密
  //加密后的密码
  userInfo.pass = md5.update(userPwd).digest('hex');
  users.find({userName: userInfo.userName, pass: userInfo.pass}).then((e) => {
    if (e.length > 0) {
      req.session.userInfo = {userName: userInfo.userName};
      res.send({code: "0000", msg: "登录成功"});
    } else {
      res.send({code: "1001", msg: "账号或密码错误"});
    }
  }).catch((e) => {
    console.info(e, "登录账号出错");
  });
});


module.exports = router;
