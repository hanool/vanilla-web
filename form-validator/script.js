// Grab form elements
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


// Form Functions
const showError = (input, msg) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'

  const small = formControl.querySelector('small');
  small.innerText = msg;
}

const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

const isValidEmail = (input) => {
  const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  return reEmail.test(String(input).toLowerCase());
}

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (username.value === '') {
    showError(username, 'Username is required')
  } else {
    showSuccess(username)
  }

  if (email.value === '') {
    showError(email, 'Email is required')
  } else if (!isValidEmail(email.value)) {
    showError(email , 'Invalid Email')
  } else {
    showSuccess(email)
  }

  if (password.value === '') {
    showError(password, 'password is required')
  } else if (password2.value === '' || password.value !== password2.value) {
    showError(password, 'password not matching')
    showError(password2, 'password not matching')
  } else {
    showSuccess(password)
    showSuccess(password2)
  }
})
