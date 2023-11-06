const mongoose = require("mongoose");

/* s Indicates supplier */
const supplierSchema = new mongoose.Schema({
  sName: {
    type: String,
  },
  sID: {
    type: String,
  },
  sAddress: {
    type: String,
  },
  sContactNo: {
    type: String,
  },
  sEmail: {
    type: String,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);