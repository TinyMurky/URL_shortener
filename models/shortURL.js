import mongoose from "mongoose"
const shortURLSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "ID miss"],
  },
  origin_URL: {
    type: String,
    required: [true, "Original URL is missing"],
  },
})

export default mongoose.models?.ShortURL ||
  mongoose.model("ShortURL", shortURLSchema)
