const ProductItem = require("../models/productItem");
const mongoose = require("mongoose");
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
  } catch (error) {
    console.error(error);
    return null; // or handle the error as needed
  }
}
module.exports = groupedData;
