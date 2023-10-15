const nodeMailer = require("nodemailer");

async function sendMail(recepient, mailData, subject, text) {
  console.log("request on sendmail");
  console.log(process.env.EMAIL);
  console.log(process.env.PASSWORD);
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transporter = nodeMailer.createTransport(config);

  let message = {
    from: process.env.EMAIL,
    to: recepient,
    subject: subject,
    text: text,
    html: mailData,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendMail;
