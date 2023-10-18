const cron = require("node-cron");
const axios = require("axios");
const Product = require("../models/product");
const checkInventory = require("../utils/checkinventory");

let previousLowItems = []; // Store the previous low items

async function sendNotificationIfLowItemsChanged(url) {

  try {
    checkInventory("lowitems").then((currentLowItems) => {
      if (currentLowItems.length > 0) {
        // Compare current low items with previous low items
        const newLowItems = currentLowItems.filter(
          (item) =>
            !previousLowItems.some((prevItem) => prevItem.pID === item.pID)
        );

        if (newLowItems.length > 0) {
          const notifyAdminURL = url;
          axios
            .get(notifyAdminURL)
            .then((response) => {
              console.log(
                "Notification sent:",
                response.status,
                response.statusText
              );
            })
            .catch((error) => {
              console.error("Error sending notification:", error);
            });
        }

        previousLowItems = currentLowItems;
      }
    });
  } catch (error) {
    console.log("error inside autonotifyLowItems.js", error);
  }
}

// Schedule the cron job to periodically, here every sec | check the inventory and send notifications
cron.schedule("* * * * * *", () => {
  sendNotificationIfLowItemsChanged(url);
});

module.exports = sendNotificationIfLowItemsChanged;
