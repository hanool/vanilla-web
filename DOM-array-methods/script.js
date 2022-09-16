// Grab DOM Elements
const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairBtn = document.getElementById('show-millionairs')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('sort')

let data = [];

// Functions
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()  
  
  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser)
}

const addData = obj => {
  data.push(obj)

  updateDOM()
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
addUserBtn.addEventListener('click', getRandomUser)

