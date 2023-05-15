import express from "express"
import shortURL from "../../models/shortURL.js"
import { randomID, createShortURL } from "../../plugins/randomID.js"
import { ROOT } from "../../app.js"
const router = express.Router()
const setting = {
  home: {
    renderURLConfig: null,
    errorMessage: null,
  },
}
router.get("/", (req, res) => {
  res.render("index", setting.home)
})
router.put("/shortURL", (req, res) => {
  const origin_URL = req.body.origin_URL.trim()
  if (origin_URL) {
    createShortURL(origin_URL)
      .then((renderURLConfig) => {
        console.log(renderURLConfig)
        renderURLConfig.newURL = `${ROOT}/${renderURLConfig._id}`
        setting.home.renderURLConfig = renderURLConfig
        res.render("index", setting.home)
      })
      .catch((error) => console.error(error.message))
  } else {
    res.redirect("/")
  }
})

router.get("/:id", (req, res) => {
  const shortUrlID = req.params.id
  shortURL.findById(shortUrlID).then((shortUrl) => {
    if (shortURL) {
      res.redirect(shortUrl.origin_URL)
    } else {
      setting.home.renderURLConfig = null
      setting.home.errorMessage = "Sorry the short url might missing"
      res.redirect("/")
    }
  })
})
export { router }

//copy
//error handle
//schema validation
//enable bootstrap error js
