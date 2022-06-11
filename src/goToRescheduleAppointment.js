const chalk = require('chalk');

const goToRescheduleAppointment = async (page) => {
  await page.click('.dropdown a.button');
  await page.waitForSelector('.accordion-item:nth-child(4) .accordion-content a');
  await page.evaluate(() => {
    document.querySelector('.accordion-item:nth-child(4) .accordion-content a').click();
  })

  console.log(chalk.green('✅ Going to reschedule page successful'));
};

module.exports = goToRescheduleAppointment;
