const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { MAILER } = require("../utils/constant");
const { pendingWishes } = require("../data/wish");

const MESSAGE_HEADER = {
  from: MAILER.MAIL_FROM,
  to: MAILER.MAIL_TO,
  subject: MAILER.MAIL_SUBJECT,
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

});

const sendMail = () => {
  // console.log("Hello");

  try {
    pendingWishes.map(({ username, address, wish }) => {
     
      
      const text = ejs.renderFile(
        path.join(__dirname, "../../views/email.ejs"),
        { username, address, wish },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          transporter.sendMail({ ...MESSAGE_HEADER, html });
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMail };
