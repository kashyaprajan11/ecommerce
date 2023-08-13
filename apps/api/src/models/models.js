const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requried: true,
  },
  description: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
