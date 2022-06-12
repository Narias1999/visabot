const nodemailer = require('nodemailer');
const chalk = require('chalk');

const { NOTIFICATIONS_MAIL, NOTIFICATIONS_SECRET, email } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: NOTIFICATIONS_MAIL,
    pass: NOTIFICATIONS_SECRET,
  },
});

transporter.verify()
  .then(() => console.log(chalk.blue('📧 System ready to send notifications')));

const notifySpotAvailable = async (date) => {
  await transporter.sendMail({
    from: 'Visa Alerts <visaalertservice@gmail.com>',
    to: email,
    subject: `Visa spot available on ${date}`,
    html: '<b><a href="https://ais.usvisa-info.com/en-co/niv/users/sign_in">Reserve your spot now!</a></b>'
  });
};

const messageTypes = {
  SPOT_AVAILABLE: 'spotAvailable',
};

const emailsMap = {
  [messageTypes.SPOT_AVAILABLE]: notifySpotAvailable,
};


const sendMessage = (messageType, context) => {
  if (emailsMap[messageType]) {
    emailsMap[messageType](context);
  } else {
    console.log(chalk.red(`❌ Message type ${messageType} does not exist.`));
  }
};

module.exports.messageTypes = messageTypes;
module.exports.sendMessage = sendMessage;
