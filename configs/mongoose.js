import mongoose from "mongoose"
import dotenv from "dotenv"
if (process.env.NODE_ENV !== "Production") {
  dotenv.config({ path: ".env" })
}

const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_REPO}?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URL)
const db = mongoose.connection

db.on("error", (error) => {
  console.log("MongoDB connect error:")
  console.error(error)
})

db.once("open", () => {
  console.log("MongoDB connect correctly")
})
export { db }
