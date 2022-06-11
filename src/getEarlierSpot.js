const { delay, selectEarlierAvailableDay } = require('./utils');

const getEarlierSpot = async (page) => {
  await page.waitForSelector('#appointments_consulate_appointment_date');
  await delay(2000);
  console.log('looking for earlier spot avilable...')
  const earlierDay = await selectEarlierAvailableDay('#appointments_consulate_appointment_date');
  console.log('earlier spot found', earlierDay);

  return earlierDay;
};

module.exports = getEarlierSpot;
