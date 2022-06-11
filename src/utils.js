function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
};

async function selectEarlierAvailableDay(page, calendarSelector) {
  const earlierDay = await page.evaluate((selector) => {
    document.querySelector(selector).click();
    const calendarSelector = '#ui-datepicker-div .ui-datepicker-group-first';
    let i = 0;
    let availableSpot;
    while (i < 30) {
      availableSpot = document.querySelector(`${calendarSelector} .ui-datepicker-calendar td:not(.ui-datepicker-unselectable)`);
      if (availableSpot) {
        availableSpot.querySelector('a').click();
        break;
      }
      document.querySelector('#ui-datepicker-div a[data-handler=next]').click();
      i++;
    };

    if (availableSpot) {
      const day = availableSpot.textContent;
      const month = document.querySelector(`${calendarSelector} .ui-datepicker-month`).textContent;
      const year = document.querySelector(`${calendarSelector} .ui-datepicker-year`).textContent;
      return `${day} ${month} ${year}`;
    }

    return 'none';
  }, calendarSelector);
  
  return earlierDay;
}

async function getHoursFromSelect(selector) {
  const hoursArray = await page.evaluate((selector) => {
    const options = [];
    document.querySelectorAll(`${selector} option`)
      .forEach(element => {
        if (element.value) {
          options.push(element.value);
        }
      });
  
      return options;
    }, selector
  );

  return hoursArray;
}

module.exports.delay = delay;
module.exports.selectEarlierAvailableDay = selectEarlierAvailableDay;
module.exports.getHoursFromSelect = getHoursFromSelect;
