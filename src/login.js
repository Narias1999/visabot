const login = async (page, credentials) => {
  await page.waitForSelector('input.email');
  await page.focus('input.email');
  await page.keyboard.type(credentials.email);
  await page.focus('input.password');
  await page.keyboard.type(credentials.password);

  await page.click('input#policy_confirmed');
  await page.click('input[type=submit]');
  console.log('login successful');
};

module.exports = login;
