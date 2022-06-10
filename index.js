require('dotenv').config();
const puppeteer = require('puppeteer');
const login = require('./src/login');

const credentials = {
  email: process.env.email,
  password: process.env.password,
};

const startProcess = async () => {
  const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'prod' });
  const page = await browser.newPage();
  await page.goto('https://ais.usvisa-info.com/en-co/niv/users/sign_in');
  await login(page, credentials);
}

startProcess();
