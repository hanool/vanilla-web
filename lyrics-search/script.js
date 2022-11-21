const form = document.getElementById('form')
const searchTerm = document.getElementById('search-term')
const btnSearch = document.getElementById('btn-search')
const searchResult = document.getElementById('search-result')
const pagination = document.getElementById('pagination')

const apiURL = `https://api.lyrics.ovh`

// functions
const searchSongs = async (term) => {
  const res = await fetch(`${apiURL}/suggest/${term}`)
  const data = await res.json()

  showData(data)
}

const showData = (songData) => {
  console.log(songData.prev || songData.next)
  searchResult.innerHTML = `
    <ul class="songs">
      ${songData.data
        .map(
          (song) => `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn btn-lyrics" data-artist="${song.artist.name}" data-song-title="${song.title}"> Get Lyrics</button>
        </li>
      `
        )
        .join('')}
    </ul>
  `

  if (songData.prev || songData.next) {
    pagination.innerHTML = `
      ${
        songData.prev
          ? `<button class="btn" onclick="getMoreSongs('${songData.prev}')">Prev</button>`
          : ''
      }
      ${
        songData.next
          ? `<button class="btn" onclick="getMoreSongs('${songData.next}')">Next</button>`
          : ''
      }
    `
  } else {
    pagination.innerHTML = ''
  }
}

const getMoreSongs = async (url) => {
  // needs to visit https://cors-anywhere.herokuapp.com/
  // and click on the "Request temporary access to the demo server" button
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  const data = await res.json()

  showData(data)
}

const getLyrics = async (artist, songTitle) => {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
  const data = await res.json()
  const lyrics = data?.lyrics

  if (!lyrics) return

  searchResult.innerHTML = `
    <h2>
      <strong>${artist}</strong> - ${songTitle}
    </h2>
    <span>${lyrics}</span>
  `
  pagination.innerHTML = ''
}

const submitSongSearchForm = (e) => {
  e.preventDefault()

  const searchValue = searchTerm.value.trim()

  if (!searchValue) {
    alert('Please type in a search term')
  } else {
    searchSongs(searchValue)
  }
}

const onResultClicked = (e) => {
  const clickedEl = e.target

  if (!clickedEl.classList.contains('btn-lyrics')) return

  const artist = clickedEl.getAttribute('data-artist')
  const songTitle = clickedEl.getAttribute('data-song-title')

  getLyrics(artist, songTitle)
}

// event listeners
form.addEventListener('submit', submitSongSearchForm)
searchResult.addEventListener('click', onResultClicked)
