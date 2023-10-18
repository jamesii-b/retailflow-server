const Product = require("../models/product");

checkExpiry = async () => {
  try {
    const salesData = await Product.find();
    expiryItems = [];
    for (const item of salesData) {
      if (salesData[item].expireDate <= Date.now()) {
        expiryItems.push(item);
      }
    }
    return expiryItems;
  } catch (err) {
    console.log(`Something went wrong with fetch: ${err}`);
    return null;
  }
};
module.exports = checkExpiry;
