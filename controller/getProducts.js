const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.json({ success: true, products });
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.cat;
  const products = await Product.find({ category });
  return res.json({ success: true, products });
};

const getProductsbySubCat = async (req, res) => {
  const category = req.params.cat;
  const subCategory = req.params.subCat;
  const products = await Product.find({ category, subCategory });
  return res.json({ success: true, products });
};

const getSpecificProduct = async (req, res) => {
  const product_id = req.params.pid;
  const product = await Product.find({ pID: product_id });
  if (product.length === 0 || !product) {
    return res.json({
      success: false,
      message: "Product not found",
    });
  }
  return res.json({ success: true, product });
};
module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsbySubCat,
  getSpecificProduct,
};
