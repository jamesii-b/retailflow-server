const ProductItem = require("../models/productItem")
const Product = require("../models/product");
const { Console } = require("console");
const { model } = require("mongoose");

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
  // console.log(req.query)
  if (!req.query.short) {
    console.log("inside long")
    try {
      const ID = req.params.id;
      const productItem = await ProductItem.find({ ID: ID }).populate("productFamily");
      if (productItem.length === 0 || !productItem[0]) {
        return res.json({
          success: false,
          message: "Product not found",
        });
      }
      return res.json({ success: true, productItem });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
      });
    }
  } else {
    console.log("inside short")
    try {
      const ID = req.params.id;
      const productItem = await ProductItem.findOne({ ID: ID })
        .populate({
          path: "productFamily",
          model: "Product", // Specify the model to populate from
          select: "pName",

        })
        .select(" priceRate ID");

      if (!productItem) {
        return res.json({
          message: "Product not found",
        });
      } else {
        return res.json({ productItem })
      }

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
      });
    }
  }
};
const getAllProductItems = async (req, res) => {
  try {
    const ID = req.params.id;
    const productItem = await ProductItem.find().populate("productFamily");
    if (productItem.length === 0 || !productItem[0]) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    return res.json({ success: true, productItem });
  } catch (error) {
    console.log(error)
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
  getSpecificProduct, getAllProductItems
};
