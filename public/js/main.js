const SERVER_ADDRESS = 'http://localhost:8000'

console.log(`main.js loaded`)
console.log(`Pulling from ${SERVER_ADDRESS}`)

const output = document.getElementById('output')
const button = document.getElementById('get-posts-btn')
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
