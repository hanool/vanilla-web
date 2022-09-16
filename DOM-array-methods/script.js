// Grab DOM Elements
const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairBtn = document.getElementById('show-millionairs')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];

// Functions
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()  
 
  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 5000000)
  }

  addData(newUser)
}

const addData = obj => {
  data.push(obj)

  updateDOM()
}

const doubleMoney = () => {
  data = data.map(user => {
    return {
      ...user, 
      money: user.money * 2
    }
  })

  updateDOM()
}

const filterMillionairs = () => {
  const millionairs = data.filter(user => user.money >= 1000000)

  updateDOM(millionairs)
}

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money) // providing `compairison function` to `sort`

  updateDOM()
}

const calculateEntireWealth = () => {
  const total = data.reduce((acc, user) => acc += user.money, 0)

  const totalEl = document.createElement('div')
  totalEl.innerHTML = `<h3>Total Wealth: <string>${formatMoney(total)}</strong></h3>`

  main.appendChild(totalEl)
}

const updateDOM = (providedData = data) => {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

  // add providedData to DOM
  providedData.forEach(item => {
    const domElem = document.createElement('div')
    domElem.classList.add(['person'])
    domElem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(domElem)
  })
}

const formatMoney = num => '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

// Event Listeners
window.addEventListener('load', () => { getRandomUser(); getRandomUser(); })
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillionairBtn.addEventListener('click', filterMillionairs)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calculateEntireWealth)
