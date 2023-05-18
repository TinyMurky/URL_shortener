export function renderError(res, setting, error) {
  setting.errorMessage = error.message
  res.render("index", setting)
  console.log(error.message)
}
