// check if the thresholdData is less then the quantityData
const Product = require("../models/product");

async function checkInventory() {
  try {
    const salesData = await Product.find();
    const lowItems = [];

    for (const item of salesData) {
      if (item.quantity < parseInt(item.threshold)) {
        const lowItem = {
          pID: item.pID,
          pName: item.pName,
          quantity: item.quantity,
          threshold: item.threshold,
        };

        lowItems.push(lowItem);
      }
    }
    // Return the low inventory items as a JSON object
    return lowItems;
  } catch (error) {
    console.log(`Something went wrong with fetch: ${error}`);
    return null; // or handle the error as needed
  }
}

module.exports = checkInventory;
