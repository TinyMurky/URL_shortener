import express from "express"
import { router as home } from "./modules/home.js"
import { router as shortURLs } from "./modules/shortURLs.js"

const router = express.Router()
router.use("/", home)
router.use("/shortURLs", shortURLs)
export { router }
