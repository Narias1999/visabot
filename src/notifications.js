const nodemailer = require('nodemailer');

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
  .then(() => console.log('system ready to send notifications'));

const notify = async (date) => {
  await transporter.sendMail({
    from: 'Visa Alerts <visaalertservice@gmail.com>',
    to: email,
    subject: `Visa spot available on ${date}`,
    html: '<b>Reserve your spot now!</b>'
  });
};

module.exports = notify;
