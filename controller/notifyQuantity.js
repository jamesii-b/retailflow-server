// Purpose: To send email to admin when inventory is low
mailData = `<center><h1>Cavetown Mart</h1></center><h3>Hi Admin,</h3><br /><div>  This is to inform you that we have been running low on the inventory.  Please check the inventory and update the inventory accordingly. We have  attached below the items extremely running low.</div><br />Regards, <br />System Admin <br />James B. <br /><br /><br /><br /><center><h1>Inventory</h1></center><table border="1" style="width: 100%">  <tr>  <th>Standard Product ID</th>  <th>Item Name</th>    <th>Quantity</th><th>Threshold</th>`;
const sendMail = require("../utils/sendMail.js");
const checkInventory = require("../utils/checkinventory.js");
const recepient = process.env.ADMIN_EMAIL;
const subject = "Inventory Running Low !";

function concatdata(resObj) {
  for (i in resObj) {
    mailData += `<tr><td>${resObj[i].pID}</td><td>${resObj[i].pName}</td><td>${resObj[i].quantity}</td><td>${resObj[i].threshold}</td></tr>`;
  }
  mailData += `</table>`;
}

text = "Inventory Running Low";
async function notifyQuantity(req, res) {
  try {
    const currentLowItems = await checkInventory("lowitems");
    console.log("Sending low quantity email", currentLowItems);
    await concatdata(currentLowItems);
    sendMail(recepient, mailData, subject, text);
    res.status(200).send("Email sent");
  } catch (err) {
    console.log(err);
    resObj = [];
    res.status(500).send("Error sending email");
  }
}

module.exports = notifyQuantity;
