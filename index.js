require('dotenv').config();

const puppeteer = require('puppeteer');
const chalk = require('chalk');

const login = require('./src/login');
const getCurrentAppointmentDate = require('./src/getCurrentAppointmentDate');
const goToRescheduleAppointment =  require('./src/goToRescheduleAppointment');
const getEarlierSpot = require('./src/getEarlierSpot');
const Logger = require('./src/logger');
const notify = require('./src/notifications');
const reserveAppointment = require('./src/reserveAppointment');

const waitingTime = 2;
const logger = new Logger();

const startProcess = async () => {
  console.log(chalk.cyan('✨ Lets start the scrapping...'));
  const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'prod' });
  const page = await browser.newPage();
  try {
    await page.goto('https://ais.usvisa-info.com/en-co/niv/users/sign_in');
    await login(page);
    const appointmentDates = await getCurrentAppointmentDate(page);
    await goToRescheduleAppointment(page);
    const earlierDay = await getEarlierSpot(page);
    const isEarlier = new Date(earlierDay) < appointmentDates.consularAppointment;

    logger.updateLog(`Current date: ${appointmentDates.consularAppointment.toDateString()}, earlier spot: ${earlierDay}. earlier: ${isEarlier}`);
  
    if (isEarlier) {
      await notify(earlierDay);
    }
  
    await reserveAppointment(page);
  } catch (error) {
    console.log(chalk.red(`❌ ${error.message}`));
  } finally {
    if (process.env.NODE_ENV === 'prod') {
      console.log(chalk.blue(`🛑 Closing the browser`));
      console.log(chalk.yellow(`⌛ Scraper will run again in ${waitingTime} minutes`));
      await browser.close();
    }
  }
}

if (process.env.NODE_ENV === 'prod') {
  const intervalTime = 1000 * 60 * waitingTime;
  startProcess();

  setInterval(() => {
    startProcess();
  }, intervalTime);
} else {
  startProcess();
}

