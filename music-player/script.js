// DOM Elements
const musicContainer = document.getElementById('music-container')
const title = document.getElementById('title')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Data
const songs = [
  {
    id: 0,
    name: 'cradles',
    artist: 'Sub Urban',
    img: 'cradles.png',
    music: 'Sub Urban - Cradles [NCS Release].mp3',
  },
  {
    id: 1,
    name: 'royalty',
    artist: 'Egzod, Maestro Chives, Neoni',
    img: 'royalty.jpg',
    music: 'Egzod, Maestro Chives, Neoni - Royalty [NCS Release].mp3',
  },
  {
    id: 2,
    name: 'on & on',
    artist: 'Cartoon',
    img: 'on_on.jpg',
    music: 'Cartoon - On & On (feat. Daniel Levi) [NCS Release].mp3',
  },
]
let songIndex = 0 //Math.floor(Math.random() * 3)

// Functions
const loadSong = () => {
  const song = songs[songIndex]
  title.innerText = `${song.artist} - ${song.name}`
  cover.src = `img/${song.img}`
  audio.src = `music/${song.music}`
}

const prevSong = () => {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong()
  playSong()
}

const nextSong = () => {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong()
  playSong()
}

const playSong = () => {
  audio.play()
  musicContainer.classList.add('play')
  playBtn.querySelector('.fas').classList.remove('fa-play')
  playBtn.querySelector('.fas').classList.add('fa-pause')
}

const pauseSong = () => {
  audio.pause()
  musicContainer.classList.remove('play')
  playBtn.querySelector('.fas').classList.add('fa-play')
  playBtn.querySelector('.fas').classList.remove('fa-pause')
}

const updateProgress = () => {
  progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`
}

const setProgress = (e) => {
  const clickX = e.clientX - progressContainer.getBoundingClientRect().x
  const widthRatio = clickX / progressContainer.clientWidth
  audio.currentTime = widthRatio * audio.duration
}

// Event Listeners
window.addEventListener('load', loadSong)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('ended', nextSong)
playBtn.addEventListener('click', () => {
  if (musicContainer.classList.contains('play')) {
    pauseSong()
  } else {
    playSong()
  }
})
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
