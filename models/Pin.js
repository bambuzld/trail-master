const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model("Pin", PinSchema);
