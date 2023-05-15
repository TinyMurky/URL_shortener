import "./configs/mongoose.js"
import express from "express"
const app = express()
import exphbs from "express-handlebars"
import { router as routes } from "./routes/index.js"
import methodOverride from "method-override"
import shortURL from "./models/shortURL.js"
const PORT = process.env.PORT || 3000
export const ROOT = process.env.HOST || `localhost:${PORT}`

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server ${ROOT} started`)
})
