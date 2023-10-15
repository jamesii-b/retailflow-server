const nodeMailer = require("nodemailer");
const Mailgen = require("mailgen");

async function sendMail(req, res, next) {
  console.log("request on sendmail");
  console.log(process.env.EMAIL);
  console.log(process.env.PASSWORD);
  let mailid = req.body.mailid;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transporter = nodeMailer.createTransport(config);
  let mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      intro: "Hi there, We have some few items running low in inventory, please check the table below for more details.",
    //   table: {
    //     data: [{ description: "Description here", price: "$1000" }],
    //   },
      outro: "Thank you, \n Admin | James B.",
    },
  };
  let mail = mailGenerator.generate(mail);
  let message = {
    from: process.env.EMAIL,
    to: mailid,
    subject: "Items Low!!",
    html: mail,
  };

  try {
    // You had an issue here, you should use the `sendMail` method with the `message` object as an argument.
    await transporter.sendMail(message);
    console.log("Email sent successfully");
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    // Catch and log any errors that may occur.
    console.log("Error in sending mail");
    console.log(err);
  }
}

module.exports = sendMail;
