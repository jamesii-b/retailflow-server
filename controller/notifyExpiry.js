mailData = `<center><h1>Cavetown Mart</h1></center><h3>Hi Admin,</h3><br /><div>  This is to inform you that products are Expired/Expiring soon.  Please check the inventory and update it accordingly. We have  attached below the items that are expired and expiring.</div><br />Regards, <br />System Admin <br />James B. <br /><br /><br /><br /><center><h1>Inventory</h1></center><table border="1" style="width: 100%">  <tr>  <th>Product ID</th>  <th>Item Name</th>    <th>Quantity</th><th>Expiry Date</th>`;
const recepient = process.env.ADMIN_EMAIL;
const subject = "Items Expiring Soon !";
const text = "Items Expiring Soon";
const checkExpiry = require("../utils/checkExpiry.js");
async function concatdata(resObj) {
  for (i in resObj) {
    mailData += `<tr><td>${resObj[i].pID}</td><td>${resObj[i].pName}</td><td>${resObj[i].quantity}</td><td>${resObj[i].expireDate}</td></tr>`;
    console.log(resObj[i]);
  }
  mailData += `</table>`;
}

const notifyExpiry = async (req, res) => {
  try {
    resObj = await checkExpiry();
    concatdata(resObj);
    sendMail(recepient, mailData, subject, text);
    res.status(200).send("Email sent");
  } catch (err) {
    console.log(err);
    resObj = [];
    res.status(500).send("Error sending email");
  }
};

module.exports = notifyExpiry;
