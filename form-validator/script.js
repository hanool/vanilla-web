// Grab Form Elements
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


// Form Functions
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const showError = (input, msg) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'

  const small = formControl.querySelector('small')
  small.innerText = msg;
}

const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

const checkRequired = (input) => {
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`)
  } else {
    showSuccess(input)
  }
}

const checkValidFormat = (input, formats) => {
  const invalid = formats.filter( format => !format.format.test(String(input.value)) )
  if (invalid.length > 0) {
    const defaultMsg = invalid[invalid.length - 1].msg
    const errMsg = defaultMsg ? defaultMsg : `Invalid ${getFieldName(input)}`
    showError(input, errMsg)
  } else {
    showSuccess(input)
  }
}

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault()

  ;[username, email, password, password2]
    .forEach(input => checkRequired(input))
  
  checkValidFormat(username, usernameFormat)
  checkValidFormat(email, emailFormat)
  checkValidFormat(password, passwordFormat)
  checkValidFormat(password2, passwordMatchFormat)
})

const emailFormat = [
  {format: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: ''}
]

const usernameFormat = [
  {format: /^.{3,15}$/, msg: `${getFieldName(username)} should be 3~15 length`}
]

const passwordFormat = [
  {format: /^.{6,15}$/, msg: `${getFieldName(password)} should be 6~15 length`},
  {format: /[A-Z]+/, msg: `${getFieldName(password)} should contain least 1 uppercase alphabets`},
]

const passwordMatchFormat = [
  {format: new RegExp(password.value), msg: `password doesn't matches`}
]
