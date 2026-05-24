const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: "https://via.placeholder.com/150"
  },

  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Product", productSchema);