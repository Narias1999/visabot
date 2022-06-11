const chalk = require('chalk');

const dateMapper = (appointmentString) => {
  const [_1, _2, date] = appointmentString.split('\n');
  const noCommas = date.trim().replaceAll(',', '');
  const [day, month, year, hour] = noCommas.split(' ');
  return new Date(`${day} ${month} ${year}`);
};

const getCurrentAppointmentDate = async (page) => {
  await page.waitForSelector('p.consular-appt');

  const consularAppointment = await page.evaluate(() => {
    const element = document.querySelector('p.consular-appt');
    return element.textContent;
  });

  const ASCAppointment = await page.evaluate(() => {
    const element = document.querySelector('p.asc-appt');
    return element.textContent;
  });

  console.log(chalk.green('✅ Getting current appointment dates successful'));

  return {
    consularAppointment: dateMapper(consularAppointment),
    ASCAppointment: dateMapper(ASCAppointment),
  };
};

module.exports = getCurrentAppointmentDate;
