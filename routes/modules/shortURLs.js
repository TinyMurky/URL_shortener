import express from "express"
import shortURL from "../../models/shortURL.js"
import { randomID, createShortURL } from "../../plugins/randomID.js"
import { renderError } from "../../plugins/renderError.js"
const router = express.Router()
import { globalSetting } from "./home.js"

const shortURLSetting = {
  ...globalSetting,
  errorMessage: null,
}
//router.use("/home", home)
router.put("/", (req, res) => {
  const origin_URL = req.body.origin_URL.trim()
  if (origin_URL) {
    createShortURL(origin_URL)
      .then((renderURLConfig) => {
        shortURLSetting.errorMessage = null
        res.redirect("/")
      })
      .catch((error) => {
        renderError(res, shortURLSetting, error)
      })
  } else {
    try {
      res.redirect("/")
    } catch (error) {
      renderError(res, shortURLSetting, error)
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
      shortURLSetting.errorMessage = null
      res.redirect("/")
    })
    .catch((error) => {
      renderError(res, shortURLSetting, error)
    })
})
export { router }
