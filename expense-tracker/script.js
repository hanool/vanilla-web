// DOM Elements
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// Functions
const init = () => {
  // Clear lists
  list.innerHTML = ``

  transactions.forEach(addTransactionToDOM)
}

const addTransaction = (e) => {
  e.preventDefault()

  // check empty value
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('🤬 Fill The Form')
    return
  }

  // create transaction info from form
  const transaction = {
    id: generateId(),
    text: text.value,
    amount: amount.value,
  }

  // add transaction info
  transactions.push(transaction)
  addTransactionToDOM(transaction)
  updateLocalStorage()

  // init form
  text.value = ''
  amount.value = ''
}

const addTransactionToDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `
    ${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${
      transaction.id
    })">x</button>
  `

  list.appendChild(item)
}

const generateId = () => {
  return (
    transactions
      .map((transaction) => transaction.id)
      .reduce((pId, cId) => (cId > pId ? cId : pId), 0) + 1
  )
}

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id)
  updateLocalStorage()
  init()
}

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
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
  const sign =
    totalIncome - totalExpense < 0
      ? '-'
      : totalIncome - totalExpense > 0
      ? '+'
      : ''
  money_plus.innerText = `+$${totalIncome}`
  money_minus.innerText = `-$${totalExpense}`
  balance.innerText = `${sign}$${total}`
  if (sign === '-') {
    balance.classList.add('minus')
    balance.classList.remove('plus')
  } else if (sign === '+') {
    balance.classList.add('plus')
    balance.classList.remove('minus')
  } else {
    balance.classList.remove('plus')
    balance.classList.remove('minus')
  }
}

// Event Listeners
window.addEventListener('load', init)
form.addEventListener('submit', addTransaction)

const listChangeObserver = new MutationObserver(() => {
  refreshTotal()
})
listChangeObserver.observe(list, { childList: true })
