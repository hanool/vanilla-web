// DOM Elements
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const dummyTransactions = [
  { id: '1', text: 'Salary', amount: '300' },
  { id: '2', text: 'Macbook', amount: '-300' },
  { id: '3', text: 'ipad', amount: '-100' },
  { id: '4', text: 'Loto', amount: '22300' },
]
let transactions = dummyTransactions

// Functions
const init = () => {
  // Clear lists
  list.innerHTML = ``

  transactions.forEach(addTransactionToDOM)
}

const addTransactionToDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `
    ${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span>
  `

  list.appendChild(item)
}

// Event Listeners
window.addEventListener('load', init)
