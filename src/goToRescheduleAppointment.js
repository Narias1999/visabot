const goToRescheduleAppointment = async (page) => {
  await page.click('.dropdown a.button');
  await page.waitForSelector('.accordion-item:nth-child(4) .accordion-content a');
  await page.evaluate(() => {
    document.querySelector('.accordion-item:nth-child(4) .accordion-content a').click();
  })

  console.log('going to reschedule page successful');
};

module.exports = goToRescheduleAppointment;
