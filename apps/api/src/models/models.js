const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
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

module.exports = mongoose.model("Product", productSchema);
