const fs = require('fs');

const fsOptions = {
  encoding: 'utf-8',
};

class Logger {
  updateLog(message) {
    const currentText = fs.readFileSync('./log.txt', fsOptions);
    const newText = `${currentText}
${message}`;
    
    fs.writeFileSync('./log.txt', newText, fsOptions);
  }
}

module.exports = Logger;

