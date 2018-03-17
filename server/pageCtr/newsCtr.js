const express = require('express');
const router = express.Router();
const News = require("../dataModel/news").News;
const path = require('path');
require('../utils/utils');

router.get('/find', function (req, res) {
  let start = new Date().getTime();

  async function findinfo(req) {
    let parms = req.query;
    let resrults = {};
    let querObj = {};
    querObj.type = parms.type;
    if (parms.endDate && parms.startDate) {
      querObj.date = {
        $lte: new Date(parms.endDate).Format('yyyyMMdd'),
        $gte: new Date(parms.startDate).Format('yyyyMMdd')
      };
    }

    let x = await News.find().count(querObj);
    News.find(querObj).sort({date: -1}).skip(Number((parms.page - 1) * parms.pageSize)).limit(Number(parms.pageSize)).exec(function (err, resrult) {
      if (err) return console.info(err);
      resrults.totalPage = x;
      resrults.data = resrult[0];
      res.send(resrults);
    })
  }

  try {
    findinfo(req);
  } catch (error) {
    console.info(error);
  }

});
module.exports = router;
