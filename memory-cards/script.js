// Grab DOM Elements
const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

// Datas
let currentActiveCard = 0
const cardsEl = []
const cards = [
  {
    question: 'What must a variable begin with?',
    answer: 'A letter, $ or _',
  },
  {
    question: 'What is a variable?',
    answer: 'Container for a piece of data',
  },
  {
    question: 'Example of Case Sensitive Variable',
    answer: 'thisIsAVariable',
  },
]

// Functions
const createCards = () => {
  cards.forEach((cardInfo, i) => {
    createCard(cardInfo, i)
  })
}

const createCard = (cardInfo, i) => {
  const cardEl = document.createElement('DIV')
  cardEl.classList.add('card')

  if (i === 0) {
    // activate if first card
    cardEl.classList.add('active')
  }

  // Create Card Element
  cardEl.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${cardInfo.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${cardInfo.answer}
        </p>
      </div>
    </div>
  `
  cardEl.addEventListener('click', () => cardEl.classList.toggle('show-answer'))

  // Add to Data/DOM
  cardsEl.push(cardEl)
  cardsContainer.appendChild(cardEl)

  updateCurrentText()
}

// Show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

const moveCardIndex = (moveAmount) => {
  currentActiveCard = currentActiveCard + moveAmount

  if (currentActiveCard >= cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1
  } else {
    cardsEl[currentActiveCard + 1].className = 'card right'
  }
  if (currentActiveCard <= 0) {
    currentActiveCard = 0
  } else {
    cardsEl[currentActiveCard - 1].className = 'card left'
  }

  cardsEl[currentActiveCard].className = 'card active'
  updateCurrentText()
}

// EventListieners
window.addEventListener('load', createCards)
nextBtn.addEventListener('click', () => moveCardIndex(+1))
prevBtn.addEventListener('click', () => moveCardIndex(-1))
