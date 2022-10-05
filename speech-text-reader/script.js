const main = document.getElementById('main')
const voiceSelect = document.getElementById('voices')
const textBox = document.getElementById('text-box')
const textarea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const message = new SpeechSynthesisUtterance()
let voices = []

const data = [
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/grandma.jpg',
    text: "I'm Comfort",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/home.jpg',
    text: "I'm Home",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurting",
  },
  {
    image: './img/outside.jpg',
    text: "I'm Outside",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/school.jpg',
    text: "I'm Studing",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
]

// Functions
const init = () => {
  data.forEach(createBox)
  setVoices()
}

const createBox = (item) => {
  // create DOM element with item data
  const box = document.createElement('div')
  const { image, text } = item
  box.classList.add('box')
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
  `
  box.addEventListener('click', (e) => {
    box.classList.add('active')
    speak(text)
  })

  main.appendChild(box)
}

const setVoices = () => {
  voices = speechSynthesis.getVoices()

  voices.forEach((voice) => {
    // create voice option
    const voiceOption = document.createElement('option')
    voiceOption.value = voice.name
    voiceOption.innerText = `${voice.name} ${voice.lang}`

    // append to select
    voiceSelect.appendChild(voiceOption)
  })
}

const getSelectedVoice = () => {
  const matchingVoices = speechSynthesis
    .getVoices()
    .filter(
      (v) => `${v.name} ${v.lang}` === voiceSelect.selectedOptions[0].innerText
    )

  return matchingVoices.length > 0 ? matchingVoices[0] : null
}

const speak = (text) => {
  // abort if already speaking
  if (speechSynthesis.speaking) {
    return
  }

  // get selected voice
  const selectedVoice = getSelectedVoice()
  if (!selectedVoice) {
    return
  }
  // create voice & text
  message.text = text
  message.voice = selectedVoice

  // speak
  speechSynthesis.speak(message)
}

const speakTextBox = (e) => {
  speak(textarea.value)
}

const toggleTextBox = () => {
  textBox.classList.toggle('show')
}

const deactiveBoxes = () => {
  document
    .querySelectorAll('.box.active')
    .forEach((box) => box.classList.remove('active'))
}
// Event Listener
window.addEventListener('load', init)
toggleBtn.addEventListener('click', toggleTextBox)
closeBtn.addEventListener('click', toggleTextBox)
readBtn.addEventListener('click', speakTextBox)
message.addEventListener('end', deactiveBoxes)
