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
          <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}"> Get Lyrics</button>
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
  const res = await fetch(`${url}`)
  const data = await res.json()

  showData(data)
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
