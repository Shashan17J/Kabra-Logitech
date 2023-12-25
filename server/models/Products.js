const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  unitPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", productsSchema);
