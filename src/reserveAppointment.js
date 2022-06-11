const { delay , getHoursFromSelect} = require('./utils');
const { RestartableError } = require('./errors');

const reserveAppointment = async (page) => {
  await delay(500);
  const hoursArray = await getHoursFromSelect('#appointments_consulate_appointment_time');

  if (!hoursArray.length) {
    throw new RestartableError();
  }

  await page.select('#appointments_consulate_appointment_time option', hoursArray[0]);
};

module.exports = reserveAppointment;
