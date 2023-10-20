const mongoose = require("mongoose");

const ProductItemSchema = new mongoose.Schema({
  ID: {
    type: String,
    default: () => Date.now().toString(),
    unique: true,
  },
  expireDate: {
    type: Date,
  },
  priceRate: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the ProductGroup model
  },
  productAdded: {
    type: Date,
    default: Date.now()
  }
});
const ProductItem = mongoose.model("ProductItem", ProductItemSchema);
module.exports = ProductItem;
