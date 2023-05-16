export function renderError(res, setting, error) {
  setting.home.errorMessage = error.message
  //res.render("index", setting.home)
  res.redirect("/")
  console.log(error.message)
}
