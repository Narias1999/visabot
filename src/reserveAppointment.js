const { delay , getHoursFromSelect, selectEarlierAvailableDay, selectOption} = require('./utils');
const { RestartableError } = require('./errors');
const chalk = require('chalk');

const reserveAppointment = async (page) => {
  console.log(chalk.yellow('⌛ Selecting hour for the consulate appointment...'));
  await delay(500);
  const consulateHourSelector = '#appointments_consulate_appointment_time';
  const hoursArray = await getHoursFromSelect(page, consulateHourSelector);

  if (!hoursArray.length) {
    console.log(chalk.red('❌ The hours select for the consulate appointment was empty'))
    throw new RestartableError();
  }

  await selectOption(page, consulateHourSelector, hoursArray[0]);

  console.log(chalk.green('✅ Hour selected: ' + hoursArray[0]));

  await delay(500);

  console.log(chalk.yellow('⌛ Looking for earlier spot for ASC appoinment...'));
  const earlierDayASC = await selectEarlierAvailableDay(page, '#appointments_asc_appointment_date');
  console.log(chalk.green('✅ Earlier spot found', earlierDayASC));
  console.log(chalk.yellow('⌛ Selecting hour for the ASC appointment...'));
  await delay(500);
  const ASCHourSelector = '#appointments_asc_appointment_time';
  const ASChoursArray = await getHoursFromSelect(page, ASCHourSelector);

  if (!ASChoursArray.length) {
    console.log(chalk.red('❌ The hours select for the ASC appointment was empty'));
    throw new RestartableError();
  }

  await selectOption(page, ASCHourSelector, ASChoursArray[0]);

  console.log(chalk.green('✅ Hour selected: ' + ASChoursArray[0]));

  await page.click('#appointments_submit');
  await delay(1000);
  console.log(chalk.green('✅ Appointment reserved succesfully!'));
};

module.exports = reserveAppointment;
