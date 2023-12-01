const Product = require("../models/product");
const ProductItem = require("../models/productItem");
const { DateTime } = require("luxon");

async function checkAllExpiry() {
  try {
    const ProductData = await Product.find();
    const expiryItems = [];

    for (const item of ProductData) {
      const ItemData = await ProductItem.find({
        productFamily: item._id.toString(),
      });

      for (const individualItem of ItemData) {
        const expiryDate = DateTime.fromJSDate(
          individualItem.expireDate
        ).toISODate();
        const today = DateTime.now().toISODate();


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
    expiryItems.sort((a, b) => {
      return a.expireDate > b.expireDate ? 1 : -1;
    });
    // console.log(expiryItems)
    return expiryItems;
  } catch (err) {
    console.log(`Something went wrong with fetch: ${err}`);
    return null;
  }
}

async function checkExpiredorExpiring() {
  try {
    const ProductData = await Product.find();
    const expiryItems = [];

    for (const item of ProductData) {
      const ItemData = await ProductItem.find({
        productFamily: item._id.toString(),
      });

      for (const individualItem of ItemData) {
        const expiryDate = DateTime.fromJSDate(
          individualItem.expireDate
        ).toISODate();
        const today = DateTime.now().toISODate();


        if (expiryDate <= today) {
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

    }
    expiryItems.sort((a, b) => {
      return a.expireDate > b.expireDate ? 1 : -1;
    });
    return expiryItems;
  } catch (err) {
    console.log(`Something went wrong with fetch: ${err}`);
    return null;
  }
}

module.exports = { checkAllExpiry, checkExpiredorExpiring };
