const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// กำหนดค่าเกี่ยวกับ email ที่จะใช้ส่ง
const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD
  }
})

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, 'templates'),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, 'templates'),
};

transporter.use('compile', hbs(handlebarOptions));

const send = async mailOptions => {
  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.log(err)
  }
}

const MailsendPassword= async (to) => {
  let mailOptions = {
    from: `"${process.env.APP_NAME}"<${process.env.APP_EMAIL}>`, // sender address
    to: to, // list of receivers
    subject: `Your Password`,
    template: 'send_password',
    context: {
      name: to
    },
  };
  await send(mailOptions);
};

module.exports = {
  MailsendPassword
}
