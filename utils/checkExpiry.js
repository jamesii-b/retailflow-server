const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const { DateTime } = require("luxon");

async function checkExpiry() {
  try {
    const ProductData = await Product.find();
    const expiryItems = [];

    for (const item of ProductData) {
      const ItemData = await ProductItem.find({
        group: item._id.toString(),
      });

      for (const individualItem of ItemData) {
        const expiryDate = DateTime.fromJSDate(
          individualItem.expireDate
        ).toISODate();
        const today = DateTime.now().toISODate();
        const diff = DateTime.fromJSDate(individualItem.expireDate)
          .diff(DateTime.fromJSDate(today), "days")
          .toObject().days;
        const existingItem = expiryItems.find(
          (entry) =>
            entry.pName === item.pName && entry.expireDate === expiryDate
        );
        if (existingItem) {
          existingItem.quantity++;
        } else {
          expiryItems.push({
            pName: item.pName,
            expireDate: expiryDate,
            quantity: 1,
          });
        }
      }
    }

    return expiryItems;
  } catch (err) {
    console.log(`Something went wrong with fetch: ${err}`);
    return null;
  }
}

module.exports = checkExpiry;
