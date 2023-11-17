const mongoose = require("mongoose");
const ProductItem = require("../models/productItem");
const Product = require("../models/product");
const Supplier = require("../models/supplier");

const addProduct = async (req, res) => {
  const RpID = req.body.pID;
  const RpName = req.body.pName;
  const productDetails = req.body.products;

  if (!productDetails || !Array.isArray(productDetails)) {
    return res.status(400).json({ msg: "Invalid product details" });
  }

  productIDtoSend = [];
  /*   if (!RpID || !RpName) {
  }
  else { */

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
        threshold: parseInt(req.body.threshold) || 0, // Correct default value and parse as integer
      });

      await newProductGroup.save();

      for (const product of productDetails) {
        for (let i = 0; i < product.quantity; i++) {
          const existingSupplier = await Supplier.findOne({ sName: product.supplier });
          const productAdd = new ProductItem({
            ID: parseInt(Date.now().toString()) + parseInt(Math.random() * 10000).toString(),
            expireDate: product.expireDate,
            priceRate: product.priceRate,
            productFamily: newProductGroup._id,
            supplier: existingSupplier.sID,
            productAdded: Date.now(),
          });
          productIDtoSend.push(productAdd.ID);
          await productAdd.save();
        }
        productIDtoSend.push('', '', '', '', '');
      }
      console.log("data sent", productIDtoSend);

      return res.status(200).json(productIDtoSend);
    } else {
      try {

        for (const product of productDetails) {
          for (let i = 0; i < product.quantity; i++) {
            const existingSupplier = await Supplier.findOne({ sName: product.supplier });
            const productAdd = new ProductItem({
              expireDate: product.expireDate,
              priceRate: product.priceRate,
              productFamily: existingProductGroup._id,
              supplier: existingSupplier.sID,
              productAdded: Date.now(),
            });
            await productAdd.save();
            productIDtoSend.push(productAdd.ID);

          }
          productIDtoSend.push('', '', '', '', '');

        }

        console.log("data sent", productIDtoSend);
        return res.status(200).json(productIDtoSend);
      }
      catch (err) {
        return res.status(500).json({ msg: "Internal Server Error | Failed to add product", err });
      }
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error | Failed to add product", e });
  }
}


module.exports = addProduct;
