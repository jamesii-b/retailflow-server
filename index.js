const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const path = require("path");
//  dbConnection()

const dbConnection = require("./lib/dbConnection");

//controllers
const addProduct = require("./controller/addProduct");
const searchProduct = require("./controller/searchProduct");
const {
  getAllProducts,
  getProductsByCategory,
  getSpecificProduct,
  getProductsbySubCat,
} = require("./controller/getProducts");




//routes
/*
app.post("/add-product", addProduct);
app.get("/search/:searchQuery", searchProduct);
app.get("/products", getAllProducts);
app.get("/products/:cat", getProductsByCategory);
app.get("/products/:cat/:subCat", getProductsbySubCat);
app.get("/product/:pid", getSpecificProduct);
*/
const productRoute=require("./routes/productRoute")
app.use("/", productRoute);
const checkout=require("./controller/checkout")

// neeed two parameters, pid and quantity
app.post("/checkout",checkout)

const sales=require("./controller/sales")
app.get("/sales",sales)


// here to debug!
// app.get("/add-product", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// const User = require("./models/user");
// app.post("/register", async (req, res) => {
//   console.log(req.body);
//   try {
//     const newUser = new User({
//       id: Date.now().toString(),
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: "fuck hello",
//       // payment: false,
//     });
//     res.send("/login");

//     await newUser.save();
//     console.log("User registered successfully.");
//   } catch (error) {
//     console.log(error);
//     res.send("/register");
//   }
// });

//ROUTES

// here i have to use app.use("") to check if authenticated or not

$PORT = 5000;
app.listen(5000 || PORT, () => {
  console.log("server is running on port 5000");
  console.log("http://localhost:5000");
});
