require("./configs/mongoose")
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const routes = require("./routes")
const methodOverride = require("method-override")
const shortURL = require("./models/shortURL")
const PORT = process.env.PORT || 3000

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server ${process.env.HOST}:${PORT}`)
})
