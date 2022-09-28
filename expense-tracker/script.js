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
    <button class="delete-btn">x</button>
  `

  list.appendChild(item)
}

const getTotalIncome = () => {
  return transactions
    .map((transaction) => Number(transaction.amount))
    .filter((amount) => amount > 0)
    .reduce((prev, curr) => prev + curr, 0)
}

const getTotalExpense = () => {
  return Math.abs(
    transactions
      .map((transaction) => Number(transaction.amount))
      .filter((amount) => amount < 0)
      .reduce((prev, curr) => prev + curr, 0)
  )
}

const refreshTotal = () => {
  const totalIncome = getTotalIncome().toFixed(2)
  const totalExpense = getTotalExpense().toFixed(2)
  const total = Math.abs(totalIncome - totalExpense).toFixed(2)
  const sign = totalIncome - totalExpense < 0 ? '-' : '+'
  money_plus.innerText = `+$${totalIncome}`
  money_minus.innerText = `-$${totalExpense}`
  balance.innerText = `${sign}$${total}`
  if (total < 0) {
    balance.classList.add('minus')
  } else {
    balance.classList.add('plus')
  }
}

// Event Listeners
window.addEventListener('load', init)

const listChangeObserver = new MutationObserver(() => {
  refreshTotal()
})
listChangeObserver.observe(list, { childList: true })
