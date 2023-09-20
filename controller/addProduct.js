const Product = require("../models/product");
// {
//   pID,
// pName,
// expireDate,
// price,
// quantity,
// category,
// subCategory,
// selfLocation,
// image,
// otherAttribute,
// supplier,
// threshold,
// }
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
      subCategory: req.body.subCategory,
      selfLocation: req.body.selfLocation,
      image: req.body.image,
      otherAttribute: req.body.otherAttribute,
      sName: req.body.supplier,
      threshold: req.body.threshold,
    });
    await productAdd.save();
    res.status(201).json({ msg: "Product added successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
module.exports = addProduct;
