const axios = require('axios');
const cheerio = require('cheerio');
const News = require("../dataModel/news").News;
const utils = require('../utils/utils');
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 0;
const type = [1, 2, 3, 4];

function getUrlArr(url) {
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          let data = response.data;
          data = JSON.parse(data.split('= ')[1].split(';')[0]).data;
          const urlArr = [];
          data.forEach(e => {
            urlArr.push(e.url)
          });
          resolve(urlArr)
        }
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

function getInfo(url) {
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          let data = response.data;
          let obj = {};
          let $ = cheerio.load(data);
          $("div[data-sudaclick='ad_content_guba_p']").remove();
          $('.fin_reference').remove();
          $('.ct_hqimg').remove();
          $('.artical-player-wrap').remove();
          $('#artibody').remove(".ad_content_guba_p");
          $('#artibody').find('script').each(function () {
            $(this).remove()
          });
          $('#artibody').find('style').each(function () {
            $(this).remove()
          });
          obj.title = $('#artibodyTitle').text().replace(/[\r\n\t]/g, '');
          if (!obj.title) {
            obj.title = $($('.main-title')[0]).text();
          }
          obj.date = new Date().Format("yyyyMMdd");
          let html = $('#artibody').html();
          obj.news = `<div class="article article_16" id="artibody">${html}</div>`;
          resolve(obj)
        }
      })
      .catch(function (error) {
        console.log(error);
        reject(error)
      });
  })
}

async function start(url) {
  for (var x = 0; x < url.length; x++) {
    let urlArr = await getUrlArr(url[x]);
    var infoArr = [];
    for (var i = 0; i < urlArr.length; i++) {
      let info = await getInfo(urlArr[i]);
      info.type = type[x];
      let fluffy = new News(info);  // 保存到数据库
      fluffy.save();
      infoArr.push(info);
      utils(2000);
    }
  }
  console.info('执行完成1');
}

async function init() {
  const time = new Date().Format("yyyyMMdd");
  const url = [`http://top.finance.sina.com.cn/ws/GetTopDataList.php?top_type=day&top_cat=finance_0_suda&top_time=${time}&top_show_num=20&top_order=DESC&js_var=all_1_data&get_new=1`, `http://top.finance.sina.com.cn/ws/GetTopDataList.php?top_type=day&top_cat=finance_news_0_suda&top_time=${time}&get_new=1&top_show_num=20&top_order=DESC&js_var=all_1_data`, `http://top.finance.sina.com.cn/ws/GetTopDataList.php?top_not_url=/ustock/&top_type=day&top_cat=finance_stock_conten_suda&top_time=${time}&top_show_num=20&top_order=DESC&get_new=1&js_var=stock_1_data`, `http://top.finance.sina.com.cn/ws/GetTopDataList.php?top_type=day&top_cat=finance_money_suda&top_time=${time}&top_show_num=20&top_order=DESC&get_new=1&js_var=money_1_data`];
  let currentTime = await  News.find({date: `${time}`}).count();
  if (currentTime === 0) {
    await start(url);
  }
  console.info('执行完成2')
}

schedule.scheduleJob(rule, function () {
  try {
    init()
  } catch (error) {
    console.info(error);
  }
});

