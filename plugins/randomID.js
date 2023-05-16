import { customAlphabet } from "nanoid"
//import { db } from "../configs/mongoose.js"
import shortURL from "../models/shortURL.js"
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const nanoid = customAlphabet(alphabet, 5)

//random 一個5碼id，並查看mongoDB是否已存在此id，如果已存在就loop
//如果未存在就output id
export async function randomID() {
  let outputID = nanoid()
  try {
    const count = await shortURL.countDocuments({ _id: outputID }) //isnumber
    if (count) {
      return await randomID()
    } else {
      return outputID
    }
  } catch (error) {
    throw Error(error)
  }
}
async function doStuffWithUser() {
  // Await the promise returned from calling getUser.
  const user = await randomID().catch()
  console.log(user) // Prints '{name: 'bill', admin: false}'
}
/*
db.on("open", () => {
  console.log("start create")
  shortURL
    .create(
      alphabet
        .split("")
        .slice(0, -1)
        .map((item) => ({ _id: item }))
    )
    .then(() => {
      doStuffWithUser()
    })
})
*/

//此function會檢查原本的url是不是已經被建立
//如果已建立會回傳原本URL document
//如果沒有則會新增新的URL document，並回傳document的建立內容
export async function createShortURL(origin_URL) {
  try {
    const urlArray = await shortURL.find({ origin_URL })
    if (urlArray.length) {
      urlArray[0].set("updatedAt", new Date())
      return urlArray[0].save()
    } else {
      const newID = await randomID()
      const newURLConfig = {
        _id: newID,
        origin_URL: origin_URL,
      }
      const newShortURL = new shortURL(newURLConfig)
      return newShortURL.save()
    }
  } catch (error) {
    throw Error(error)
  }
}

//createShortURL2("a").catch((error) => console.error(error))
//createShortURL2("z").catch((error) => console.error(error))
