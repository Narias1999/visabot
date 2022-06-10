function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

const getEarlierSpot = async (page) => {
  await page.waitForSelector('#appointments_consulate_appointment_date');
  await delay(2000);
  console.log('looking for earlier spot avilable...')
  const earlierDay = await page.evaluate(() => {
      document.querySelector('#appointments_consulate_appointment_date').click();
      const calendarSelector = '#ui-datepicker-div .ui-datepicker-group-first';
      let i = 0;
      let availableSpot;
      while (i < 30) {
        availableSpot = document.querySelector(`${calendarSelector} .ui-datepicker-calendar td:not(.ui-datepicker-unselectable)`);
        if (availableSpot) {
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
  });

  console.log('earlier spot found', earlierDay);

  return earlierDay;
};

module.exports = getEarlierSpot;
