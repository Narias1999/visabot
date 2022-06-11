const chalk = require('chalk');

const credentials = {
  email: process.env.email,
  password: process.env.password,
};

const login = async (page) => {
  await page.waitForSelector('input.email');
  await page.focus('input.email');
  await page.keyboard.type(credentials.email);
  await page.focus('input.password');
  await page.keyboard.type(credentials.password);

  await page.click('input#policy_confirmed');
  await page.click('input[type=submit]');
  console.log(chalk.green('✅ Login successful'));
};

module.exports = login;
