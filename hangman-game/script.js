const wordEl = document.getElementById('word')
const wrongLetterEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const endingMessage = document.getElementById('ending-message')

const figureParts = document.querySelectorAll('.figure-part')

// Game Data
const words = ['application', 'programming', 'interface', 'wizard']
const correctLetters = [];
const wrongLetters = [];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)]

// Functions
let selectedWord = getRandomWord()

const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `

  checkCorrect()
}

const checkCorrect = () => {
  const innerWord = wordEl.innerText.replace(/\n/g, '')

  console.log(innerWord)
  if (innerWord === selectedWord) {
    endingMessage.innerText = 'You Won!'
    popup.style.display = 'flex'
  }
}

const updateWrongLettersEl = () => {
  // Display Wrong Letters
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `
  // Display Hangman Parts
  figureParts.forEach( (part, index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  // Check if Lost
  if (wrongLetters.length === figureParts.length) {
    endingMessage.innerText = `You've Lost`
    popup.style.display = 'flex'
  }
}

const showNotification = () => {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

const isLetterKeyCode = (keyCode) => {
  const letterKeyCodeStart = 65
  const letterKeyCodeEnd = 90
  
  return keyCode >= letterKeyCodeStart && keyCode <= letterKeyCodeEnd
}

const checkInputLetter = (e) => {
  if (isLetterKeyCode(e.keyCode)) {
    const letter = e.key

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersEl();
      } else {
        showNotification()
      }
    }
  }
}

const reloadGame = () => {
  // Empty last games data
  correctLetters.splice(0)
  wrongLetters.splice(0)

  // Set new game data
  selectedWord = getRandomWord()
  displayWord()
  updateWrongLettersEl();

  // Hide popup
  popup.style.display = 'none'
}

// Event Listeners
window.addEventListener('keydown', checkInputLetter)
window.addEventListener('load', displayWord)
playAgainBtn.addEventListener('click', reloadGame)
