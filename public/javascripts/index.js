const allCopyBut = document.querySelectorAll(".copy-btn")
allCopyBut.forEach((copyButton) => {
  copyButton.addEventListener("click", copyShortURL)
})
function copyShortURL(event) {
  if (event.target.matches(".copy-btn")) {
    const shortURL =
      event.target.parentElement.previousElementSibling.textContent

    // Copy the text inside the text field
    navigator.clipboard.writeText(shortURL)
  }
}

const urlForm = document.querySelector("#submit-url-form")
const urlSubmitBtn = document.querySelector("#submit-btn")

//If form input is invalid, prevent form from sending
urlForm.addEventListener("submit", (event) => {
  if (!urlForm.checkValidity()) {
    event.preventDefault() //不要submit
    event.stopPropagation() //event不要bubble
  }
})
urlSubmitBtn.addEventListener("click", (event) => {
  urlForm.classList.add("was-validated")
})
