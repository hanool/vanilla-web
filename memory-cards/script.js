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

// Functions
const getCards = () => {
  try {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
  } catch {
    return []
  }
}

const setCardsData = (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards))
}

const createCards = () => {
  getCards().forEach((cardInfo, i) => {
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
  if (currentActiveCard === 0 && cardsEl.length === 0) {
    return
  }

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

const showCardAddForm = () => {
  addContainer.classList.add('show')
}

const hideCardAddForm = () => {
  addContainer.classList.remove('show')
  emptyCardAddForm()
}

const emptyCardAddForm = () => {
  questionEl.value = ''
  answerEl.value = ''
}

const addCard = () => {
  // create new card from form
  let newCard = {
    question: `${questionEl.value}`,
    answer: `${answerEl.value}`,
  }

  // add created card
  let cards = getCards()
  cards.push(newCard)
  createCard(newCard, cards.length)
  addContainer.classList.remove('show')

  // update local storage
  setCardsData(cards)

  emptyCardAddForm()
  moveCardIndex(+1)
}

const clearCards = () => {
  localStorage.setItem('cards', '')
  cardsContainer.innerHTML = ''
  window.location.reload()
}

// EventListieners
window.addEventListener('load', createCards)
nextBtn.addEventListener('click', () => moveCardIndex(+1))
prevBtn.addEventListener('click', () => moveCardIndex(-1))
showBtn.addEventListener('click', showCardAddForm)
hideBtn.addEventListener('click', hideCardAddForm)
addCardBtn.addEventListener('click', addCard)
clearBtn.addEventListener('click', clearCards)
