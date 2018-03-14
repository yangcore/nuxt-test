const router = require('express').Router();
const users = require("../dataModel/users").users;

router.post("/searchUserInfo", (req, res) => {
  if (req.session.userInfo) {
    const userInfo = req.session.userInfo;
    res.send({code: "0000", userName: userInfo.userName});
  } else {
    res.send({code: "1001", msg: "未登录"});
  }
});
router.get("/loginOut", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.info(err, '退出出现错误');
    }
    res.redirect('http://www.ychao.club/');
  })
});

module.exports = router;
