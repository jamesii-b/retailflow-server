// check if the thresholdData is less then the quantityData
const Product = require("../models/product");
const groupedData=require("../utils/groupedData.js")
async function checkInventory(returnData) {
  try {
    const salesData = await Product.find();
    const lowItems = [];
    const lowItemsallData = [];
    for (const item of salesData) {
      quantity = await groupedData(item._id.toString());
      if (quantity < parseInt(item.threshold)) {
        const lowItem = {
          pID: item.pID,
          pName: item.pName,
          quantity: quantity,
          threshold: item.threshold,
        };
        await lowItems.push(lowItem);
        await lowItemsallData.push(item);
      }
    }

    returnData = returnData.toLowerCase();
    if (returnData == "lowitems") {
      return lowItems;
    } else {
      return lowItemsallData;
    }
  } catch (error) {
    console.log(`Something went wrong with fetch: ${error}`);
    return null; // or handle the error as needed
  }
}


module.exports = checkInventory;
