// DOM Elements
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficulty = document.getElementById('difficulty')
const word = document.getElementById('word')
const text = document.getElementById('text')
const timeEl = document.getElementById('time')
const scoreContainer = document.querySelector('.score-container')
const scoreEl = document.getElementById('score')
const endGameContainer = document.getElementById('end-game-container')

// Constants & Variables
const HOLD_NUM = 20
const LOAD_THRESHOLD = 5
let words = []
let wIndex = -1
let score = 0
let time = 10
let timeInterval

// Functions
const init = () => {
  text.setAttribute('disabled', true)
  loadNewWords().then(() => {
    showNextWord()
    text.removeAttribute('disabled')
    text.focus()
    timeInterval = setInterval(updateRemainingTime, 1000)
  })
}

const updateRemainingTime = () => {
  time--
  timeEl.innerText = `${time}s`

  if (time === 0) {
    clearInterval(timeInterval)
    gameOver()
  }
}

const gameOver = () => {
  endGameContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Replay</button>
  `
  endGameContainer.style.display = 'flex'
}

const checkMatch = () => {
  if (text.value === word.innerText) {
    // score
    score += 50
    scoreEl.innerText = score
    scoreContainer.classList.add('scored')
    setTimeout(() => {
      scoreContainer.classList.remove('scored')
    }, 300)

    // time
    time += 3

    // show next
    showNextWord()
    text.value = ''
  }
}

const showNextWord = () => {
  checkNextAvailable()

  wIndex++
  const indexCheckInterval = setInterval(() => {
    if (wIndex <= words.length - 1) {
      word.innerText = words[wIndex]
      clearInterval(indexCheckInterval)
    }
  }, 300)
}

const checkNextAvailable = () => {
  if (wIndex + LOAD_THRESHOLD >= words.length) {
    loadNewWords()
  }
}

const loadNewWords = async () => {
  await fetch(`https://random-word-api.herokuapp.com/word?number=${HOLD_NUM}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      words.push(...data)
    })
}

// EventListeners
window.addEventListener('load', init)
text.addEventListener('input', checkMatch)
