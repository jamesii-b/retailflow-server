const cron = require("node-cron");
const axios = require("axios");
const Product = require("../models/product");
const checkInventory = require("../utils/checkinventory");

let previousLowItems = []; // Store the previous low items

async function sendNotificationIfLowItemsChanged(url) {
  // Check the inventory for low items

  try{
    
  checkInventory().then((currentLowItems) => {
    if (currentLowItems.length > 0) {
      // Compare current low items with previous low items
      const newLowItems = currentLowItems.filter(
        (item) =>
          !previousLowItems.some((prevItem) => prevItem.pID === item.pID)
      );

      if (newLowItems.length > 0) {
        // Send a GET request to /notifyadmin if there are new low items
        const notifyAdminURL = url; // Replace with your server URL
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

      // Update the previous low items with the current low items
      previousLowItems = currentLowItems;
    }
  });

  }
  catch(error){
    console.log("error here")
    console.log(error);
  }
}

// Schedule the cron job to periodically check the inventory and send notifications
cron.schedule("* * * * * *", () => {
  sendNotificationIfLowItemsChanged(url);
});

module.exports = sendNotificationIfLowItemsChanged;
