const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 255 },
  description: { type: String, required: true, maxLength: 255 },
  price: { type: Number, required: true },
  category: { type: Array, required: true },
  size: { type: Map, required: true },
  image: { type: Array, required: false },
});

module.exports = mongoose.model("product", productSchema);
