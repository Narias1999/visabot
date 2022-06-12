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

async function getHoursFromSelect(page, selector) {
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

// This function comes from the source code of the native page.select function of puppeteer.
// Native page.select is not working in the version 14.3.0 when the first option of a select is empty
function selectOption(page, selector, value) {
  return page.evaluate((vals, selector) => {
    const element = document.querySelector(selector);
    const values = new Set(vals);
    if (!(element instanceof HTMLSelectElement)) {
      throw new Error('Element is not a <select> element.');
    }

    const selectedValues = new Set();

    for (const option of element.options) {
      option.selected = false;
    }
    for (const option of element.options) {
      if (values.has(option.value)) {
        option.selected = true;
        selectedValues.add(option.value);
        break;
      }
    }

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return [...selectedValues.values()];
  }, [value], selector);
};

module.exports.delay = delay;
module.exports.selectEarlierAvailableDay = selectEarlierAvailableDay;
module.exports.getHoursFromSelect = getHoursFromSelect;
module.exports.selectOption = selectOption;
