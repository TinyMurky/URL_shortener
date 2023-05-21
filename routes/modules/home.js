import express from "express"
import shortURL from "../../models/shortURL.js"
import { randomID, createShortURL } from "../../plugins/randomID.js"
import { renderError } from "../../plugins/renderError.js"
const router = express.Router()
const rootPORT = process.env.PORT || 3000
export const globalSetting = {
  rootURL: process.env.HOST || `localhost:${rootPORT}`,
  script: "/javascripts/index.js",
}

router.get("/", (req, res) => {
  const homeSetting = {
    ...globalSetting,
    ...{ allURL: null, errorMessage: null },
  }
  shortURL
    .find()
    .sort({ updatedAt: -1 })
    .lean()
    .then((urlList) => {
      homeSetting.allURL = urlList
    })
    .then(() => res.render("index", homeSetting))
    .catch((error) => {
      renderError(res, homeSetting, error)
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
      renderError(res, globalSetting, error)
    }
  })
})

export { router }
