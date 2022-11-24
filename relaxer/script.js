// dom elements
const container = document.getElementById('container')
const text = document.getElementById('text')
const pointerContainer = document.getElementById('pointer-container')

// constants
const totalTime = 7500
const breatheTime = (totalTime / 5) * 2
const holdTime = totalTime / 5

// functions
const keepBreathing = () => {
  breathe()
  setInterval(breathe, totalTime)
}

const breathe = async () => {
  breatheIn()
    .then(() => hold())
    .then(() => breatheOut())
}

const breatheIn = async () => {
  text.innerText = 'Breathe In'
  container.classList.remove('shrink')
  container.classList.add('grow')

  return new Promise((resolve) => {
    setTimeout(resolve, breatheTime)
  })
}

const hold = async () => {
  text.innerText = 'Hold'

  return new Promise((resolve) => {
    setTimeout(resolve, holdTime)
  })
}

const breatheOut = async () => {
  text.innerText = 'Breathe Out'

  container.classList.remove('grow')
  container.classList.add('shrink')

  return new Promise((resolve) => {
    setTimeout(resolve, breatheTime)
  })
}

// event listeners
window.addEventListener('load', keepBreathing)
