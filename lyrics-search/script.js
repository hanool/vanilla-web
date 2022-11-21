const form = document.getElementById('form')
const searchTerm = document.getElementById('search-term')
const btnSearch = document.getElementById('btn-search')
const searchResult = document.getElementById('search-result')
const btnMore = document.getElementById('btn-more')

const apiURL = `https://api.lyrics.ovh`

// functions
const searchSongs = async (term) => {
  const res = await fetch(`${apiURL}/suggest/${term}`)
  const data = await res.json()

  showData(data)
}

const showData = (songData) => {
  console.log(songData.data)
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

// event listeners
form.addEventListener('submit', submitSongSearchForm)
