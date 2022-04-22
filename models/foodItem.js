const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: String,
  category: String,
  rating: Number,
  price: Number,
  img: String,
  quantity: Number,
  type: String,
});

module.exports = mongoose.model("food", foodSchema);
