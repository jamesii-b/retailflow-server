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
  creditNote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreditNote",
    },
  ],
  debitNote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DebitNote",
    },
  ],
});

module.exports = mongoose.model("Supplier", supplierSchema);