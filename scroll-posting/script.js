// DOM Elements
const filter = document.getElementById('filter')
const postContainer = document.getElementById('post-container')
const loader = document.querySelector('.loader')

const limit = 3
const page = 1
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
          <h2 class="post=title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      `
    postContainer.appendChild(postEl)
  })
}

// Event Listenders
window.addEventListener('load', showPosts)
