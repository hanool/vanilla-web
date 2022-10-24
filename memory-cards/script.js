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

  cardsEl.push(cardEl)
  cardsContainer.appendChild(cardEl)
}

// EventListieners
window.addEventListener('load', createCards)
