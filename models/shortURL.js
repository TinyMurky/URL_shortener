import mongoose from "mongoose"
const shortURLSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "ID miss"],
    },
    origin_URL: {
      type: String,
      //Use Schema Validation make sure URL input is valid
      validate: {
        validator: function (v) {
          return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
            v
          )
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: [true, "Original URL is missing"],
    },
  },

  { timestamps: true }
)

export default mongoose.models?.ShortURL ||
  mongoose.model("ShortURL", shortURLSchema)
