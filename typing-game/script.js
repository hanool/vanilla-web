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
const INIT_TIME = 20
const levelConfig = {
  easy: {
    timeBonus: 10,
    score: 20,
  },
  medium: {
    timeBonus: 5,
    score: 50,
  },
  hard: {
    timeBonus: 3,
    score: 100,
  },
}
let words = []
let wIndex = -1
let score = 0
let time = INIT_TIME
let timeInterval

// Functions
const init = () => {
  getLocalSettings()

  // load words
  text.setAttribute('disabled', true)
  loadNewWords().then(() => {
    showNextWord()
    text.removeAttribute('disabled')
    text.focus()
    timeInterval = setInterval(updateRemainingTime, 1000)
  })
}

const getLocalSettings = () => {
  if (localStorage.getItem('showSettings') === 'true') {
    settings.classList.add('notransition')
    settings.classList.add('show')
    settings.classList.remove('notransition')
  } else {
    localStorage.setItem('showSettings', false)
  }
  difficulty.value = localStorage.getItem('level') || 'easy'
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
    score += levelConfig[difficulty.value].score
    scoreEl.innerText = score
    scoreContainer.classList.add('scored')
    setTimeout(() => {
      scoreContainer.classList.remove('scored')
    }, 300)

    // time
    time += levelConfig[difficulty.value].timeBonus

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
      words.push(...data)
    })
}

const setLevel = () => {
  localStorage.setItem('level', difficulty.value)
  location.reload()
}

const toggleSettings = () => {
  localStorage.setItem(
    'showSettings',
    localStorage.getItem('showSettings') !== 'true'
  )
  settings.classList.toggle('show')
}

// EventListeners
window.addEventListener('load', init)
text.addEventListener('input', checkMatch)
difficulty.addEventListener('change', setLevel)
settingsBtn.addEventListener('click', toggleSettings)
