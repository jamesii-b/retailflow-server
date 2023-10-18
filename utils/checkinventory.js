// check if the thresholdData is less then the quantityData
const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const mongoose = require("mongoose");

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
async function groupedData(parentId) {
  try {
    const result = await ProductItem.aggregate([
      {
        $match: {
          group: new mongoose.Types.ObjectId(parentId), // Use the 'new' keyword here
        },
      },
      {
        $group: {
          _id: "$group",
          totalCount: { $sum: 1 }, // Count the number of items in each group
        },
      },
    ]);
    if (result.length > 0) {
      return result[0].totalCount;
    } else {
      return 0;
    }
    //result contains the parent id and total count
  } catch (error) {
    console.error(error);
    return null; // or handle the error as needed
  }
}

module.exports = checkInventory;
