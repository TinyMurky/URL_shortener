import express from "express"
import shortURL from "../../models/shortURL.js"
import { randomID, createShortURL } from "../../plugins/randomID.js"
import { ROOT } from "../../app.js"
import { renderError } from "../../plugins/renderError.js"
const router = express.Router()
import { router as home, setting } from "./home.js"

router.use("/home", home)
router.put("/", (req, res) => {
  const origin_URL = req.body.origin_URL.trim()
  if (origin_URL) {
    createShortURL(origin_URL)
      .then((renderURLConfig) => {
        res.redirect("/home")
      })
      .catch((error) => {
        renderError(res, setting, error)
      })
  } else {
    try {
      res.redirect("/")
    } catch (error) {
      renderError(res, setting, error)
    }
  }
})

router.delete("/:id", (req, res) => {
  const shortUrlID = req.params.id
  return shortURL
    .findById(shortUrlID)
    .then((targetURL) => {
      if (targetURL) {
        targetURL.deleteOne()
      } else {
        throw new Error("Sorry we can't found the URL you want to delete")
      }
    })
    .then(() => {
      setting.home.errorMessage = null
      res.redirect("/home")
    })
    .catch((error) => {
      setting.home.errorMessage = error
      renderError(res, setting, error)
    })
})
export { router }
