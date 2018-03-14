const router = require('express').Router();
const users = require("../dataModel/users").users;
const crypto = require('crypto');
router.post("/regist", (req, res) => {
  const userInfo = req.body;
  users.find({userName: userInfo.userName}).then((e) => {
    if (e.length > 0) {
      res.send({code: "1001", msg: "已有此账户名，请换个试试"});
    } else {
      let userPwd = userInfo.pass;
      const md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列,此处所示为MD5方式加密
      //加密后的密码
      userInfo.pass = md5.update(userPwd).digest('hex');
      req.session.userInfo = {userName: userInfo.userName};
      let user = new users(userInfo);
      user.save();
      res.send({code: "0000", msg: "注册成功"});
    }
  }).catch((e) => {
    console.info(e, "查询重复账号出错");
  });
});


module.exports = router;
