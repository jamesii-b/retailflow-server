const mongoose = require("mongoose");

const ProductItemSchema = new mongoose.Schema({
  ID: {
    type: String,
    default: () =>parseInt( Date.now().toString()) + parseInt(Math.random()*10000).toString(),
    unique: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  priceRate: {
    type: Number,
    required: true,
  },

  supplier: {
    type: String,
  },
  productFamily: {
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
