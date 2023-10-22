const mongoose = require("mongoose");
const ProductItem = require("../models/productItem");
const Product = require("../models/product");

const addProduct = async (req, res) => {
  const RpID = req.body.pID;
  const RpName = req.body.pName;
  const productDetails = req.body.products;

  if (!productDetails || !Array.isArray(productDetails)) {
    return res.status(400).json({ msg: "Invalid product details" });
  }

  console.log(req.body);

  try {
    existingProductGroup = await Product.findOne({ pID: RpID });
    if (!existingProductGroup) {
      const newProductGroup = new Product({
        pID: RpID,
        pName: RpName,
        category: req.body.category || "null", // Correct default values
        subCategory: req.body.subCategory || "null",
        selfLocation: req.body.selfLocation || "null",
        image: req.body.image || "null",
        otherAttribute: req.body.otherAttribute || "null",
        size: req.body.size || "null",
        sName: req.body.sName || "null",
        threshold: parseInt(req.body.threshold) || 0, // Correct default value and parse as integer
      });

      await newProductGroup.save();

      for (const product of productDetails) {
        for (let i = 0; i < product.quantity; i++) {
          const productAdd = new ProductItem({
            expireDate: product.expireDate,
            priceRate: req.body.priceRate || product.priceRate,
            productFamily: newProductGroup._id,
            productAdded: Date.now(),
          });
          await productAdd.save();
        }
      }

      return res.json({ msg: "ProductItem added successfully" });
    } else {
      console.log("product already exist");
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ msg: "Internal Server Error | Failed to add product" });
  }
};

module.exports = addProduct;
