const mongoose = require("mongoose")
const shortURL = new mongoose.Schema({
  origin_URL: {
    type: String,
    required: [true, "Original URL is missing"],
  },
  shorter_URL: {
    type: String,
  },
})

module.exports = shortURL
