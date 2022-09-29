// DOM Elements
const filter = document.getElementById('filter')
const postContainer = document.getElementById('post-container')
const loader = document.querySelector('.loader')

let limit = 5
let page = 1
const baseUrl = 'https://jsonplaceholder.typicode.com'

// Functions
const getPosts = async () => {
  const res = await fetch(`${baseUrl}/posts?_limit=${limit}&_page=${page}`)

  data = await res.json()

  return data
}

const showPosts = async () => {
  const posts = await getPosts()

  posts.forEach((post) => {
    const postEl = document.createElement('div')
    postEl.classList.add('post')
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      `
    postContainer.appendChild(postEl)
  })
}

let isLoading = false
const loadPostIfBottom = () => {
  // check if already loading posts
  if (isLoading) return

  isLoading = true
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  // check if scrolling bottom of page
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // show loading animation
    loader.classList.add('show')

    setTimeout(() => {
      // end loading after 1sec
      loader.classList.remove('show')
      isLoading = false

      // fetch posts after 0.3sec
      setTimeout(() => {
        page++
        showPosts()
      }, 300)
    }, 1000)
  } else {
    isLoading = false
  }
}

const filterPosts = (e) => {
  const term = e.target.value.toUpperCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase()
    const body = post.querySelector('.post-body').innerText.toUpperCase()

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'
    } else {
      post.style.display = 'none'
    }
  })
}

// Event Listenders
window.addEventListener('load', showPosts)
window.addEventListener('scroll', loadPostIfBottom)
filter.addEventListener('input', filterPosts)
