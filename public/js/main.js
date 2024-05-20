import { SERVER_ADDRESS } from "../../server"

console.log(`main.js loaded`)

const output = document.querySelector('#output')
const button = document.querySelector('#get-posts-btn')
button.style.color = 'red'
// Get and show posts
async function showPosts() {
    try {
        const res = await fetch(`${SERVER_ADDRESS}/api/posts`)
        if (!res.ok) {
            throw new Error('Failed to fetch posts')
        }

        const posts = await res.json()
        output.innerHTML = ''

        posts.forEach((post) => {
            const postEl = document.createElement('div')

            postEl.textContent = `${post.id} - ${post.title}`
            output.appendChild(postEl)
        })
    } catch (error) {
        console.log('Error fetching posts')
    }
}

// Event listeners
button.addEventListener("click", showPosts)
