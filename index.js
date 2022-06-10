require('dotenv').config();
const puppeteer = require('puppeteer');
const login = require('./src/login');
const getCurrentAppointmentDate = require('./src/getCurrentAppointmentDate');
const goToRescheduleAppointment =  require('./src/goToRescheduleAppointment');
const getEarlierSpot = require('./src/getEarlierSpot');

const credentials = {
  email: process.env.email,
  password: process.env.password,
};

const startProcess = async () => {
  console.log('lets start the scrapping...')
  const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'prod' });
  const page = await browser.newPage();
  try {
    await page.goto('https://ais.usvisa-info.com/en-co/niv/users/sign_in');
    await login(page, credentials);
    const appointmentDates = await getCurrentAppointmentDate(page);
    await goToRescheduleAppointment(page);
    await getEarlierSpot(page);
  } catch (error) {
    console.log('oops something failed...', error);
  } finally {
    if (process.env.NODE_ENV === 'prod') {
      console.log('closing the browser :)');
      await browser.close();
    }
  }
}

if (process.env.NODE_ENV === 'prod') {
  const intervalTime = 1000 * 60 * 5;
  
  setInterval(() => {
    startProcess();
  }, intervalTime);
} else {
  startProcess();
}

