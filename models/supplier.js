const mongoose = require("mongoose");

const Supplier = new mongoose.Schema({
  sName: {
    type: String,
  },
  sAddress: {
    type: String,
  },
  sContact: {
    type: String,
  },
  sEmail: {
    type: String,
  },
});
