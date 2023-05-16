import express from "express"
import shortURL from "../../models/shortURL.js"
import { randomID, createShortURL } from "../../plugins/randomID.js"
import { ROOT } from "../../app.js"
import { renderError } from "../../plugins/renderError.js"
const router = express.Router()
export const setting = {
  home: {
    rootURL: null,
    errorMessage: null,
    script: "/javascripts/index.js",
    allURL: null,
  },
}
router.get("/", (req, res) => {
  setting.home.rootURL = ROOT
  shortURL
    .find()
    .sort({ updatedAt: -1 })
    .lean()
    .then((urlList) => {
      setting.home.allURL = urlList
    })
    .then(() => res.render("index", setting.home))
    .catch((error) => {
      renderError(res, setting, error)
    })
})
router.get("/:id", (req, res) => {
  const shortUrlID = req.params.id
  shortURL.findById(shortUrlID).then((redirectUrl) => {
    try {
      if (redirectUrl) {
        res.redirect(redirectUrl.origin_URL)
      } else {
        res.redirect("/")
      }
    } catch (error) {
      renderError(res, setting, error)
    }
  })
})

export { router }
