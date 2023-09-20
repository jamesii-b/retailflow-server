const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByCategory,
  getSpecificProduct,
  getProductsbySubCat,
} = require("../controller/getProducts");
const addProduct = require("../controller/addProduct");
const searchProduct = require("../controller/searchProduct");


router.post("/add-product", addProduct);
router.get("/search/:searchQuery", searchProduct);
router.get("/products", getAllProducts);
router.get("/products/:cat", getProductsByCategory);
router.get("/products/:cat/:subCat", getProductsbySubCat);
router.get("/product/:pid", getSpecificProduct);

module.exports = router;
