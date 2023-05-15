import { customAlphabet } from "nanoid"
//import { db } from "../configs/mongoose.js"
import shortURL from "../models/shortURL.js"
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const nanoid = customAlphabet(alphabet, 5)

//random 一個5碼id，並查看mongoDB是否已存在此id，如果已存在就loop
//如果未存在就output id
export function randomID() {
  return new Promise((resolve, reject) => {
    let outputID = nanoid()
    resolve(
      shortURL.countDocuments({ _id: outputID }).then((count) => {
        if (count) {
          return randomID()
        } else {
          return new Promise((resolve, reject) => {
            resolve(outputID)
          })
        }
      })
    )
  })
}

//此function會檢查原本的url是不是已經被建立
//如果以備建立回傳原本URL document
//如果沒有則會新增新的URL document，並回傳document的建立內容
export function createShortURL(origin_URL) {
  return new Promise((resolve, reject) => {
    resolve(
      shortURL
        .find({ origin_URL: origin_URL })
        .lean()
        .then((URL) => {
          if (URL.length) {
            return URL[0]
          } else {
            return new Promise((resolve, reject) => {
              resolve(
                randomID().then((newID) => {
                  const newURLConfig = { _id: newID, origin_URL: origin_URL }
                  const newShortURL = new shortURL(newURLConfig)
                  newShortURL.save()
                  return new Promise((resolve, reject) => {
                    resolve(newURLConfig)
                  })
                })
              )
            })
          }
        })
    )
  })
}
