const ProductItem = require("../models/productItem")
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
  try {
    const ID = req.params.id;
    const product = await ProductItem.find({ ID: ID });

    if (product.length === 0 || !product[0]) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    const productFamily = await Product.find({ _id: product[0].group.toString() });

    return res.json({ success: true, productFamily, product });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsbySubCat,
  getSpecificProduct,
};
