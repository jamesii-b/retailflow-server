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
const checkout = require("../controller/checkout");



router.post("/add-product", addProduct);
router.get("/search/:searchQuery", searchProduct);
router.get("/products", getAllProducts);
router.get("/products/:cat", getProductsByCategory);
router.get("/products/:cat/:subCat", getProductsbySubCat);
router.get("/product/:pid", getSpecificProduct);
router.post("/checkout", checkout);


module.exports = router;
