require('dotenv').config();
const puppeteer = require('puppeteer');

const startProcess = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ais.usvisa-info.com/en-co/niv/users/sign_in');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
}

startProcess();
