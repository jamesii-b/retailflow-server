const Product = require("../models/product");
const searchProduct = async (req, res) => {
  const searchQuery = req.params.searchQuery;
  console.log("searchQuery");
  console.log(searchQuery);
  if (!searchQuery) {
    const allProducts = await Product.find({});
    return res.json({ success: true, products: allProducts });
  }
  const query = new RegExp("[a-zA-Z0-9]*" + searchQuery + "[a-zA-Z0-9]*", "i");
  const products = await Product.find({
    $or: [
      { pName: { $regex: query } },
      { category: { $regex: query } },
      { pID: { $regex: query } },
      { subCategory: { $regex: query } },
      { size: { $regex: query } },
    ],
  });
  return res.json({ success: true, products });
};

module.exports = searchProduct;
