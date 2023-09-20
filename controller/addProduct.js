const Product = require("../models/product");

const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    const productAdd = new Product({
      pID: req.body.pID,
      pName: req.body.pName,
      expireDate: req.body.expireDate,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      selfLocation: req.body.selfLocation,
      image: req.body.image,
      otherAttribute: req.body.otherAttribute,
    });
    await productAdd.save();
    res.status(201).json({ msg: "Product added successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
module.exports = addProduct;
