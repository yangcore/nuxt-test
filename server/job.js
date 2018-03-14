const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 0;
schedule.scheduleJob(rule, function () {
  console.info('执行一次');
});
