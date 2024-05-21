const SERVER_ADDRESS = 'http://localhost:8000'

const output = document.getElementById('output')
const button = document.getElementById('get-posts-btn')
const form = document.getElementById('add-post-form')

// get posts
async function showPosts() {
    // try catch for throwing errors
    try {
        const res = await fetch(`${SERVER_ADDRESS}/api/posts`)
        if (!res.ok) {
            throw new Error('Failed to fetch posts from server')
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

// add new post
async function addPost(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const title = formData.get('title')

    console.log("title: ", title)

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })
        if (!res.ok) {
            throw new Error('Failed to add post')
        }
        
        // add new post to the div
        // const postEl = document.createElement('div');
        // newPost = await res.json();
        // postEl.textContent = `${newPost.id} - ${newPost.title}`;
        // output.append(postEl);

        this.reset() // resets form data
        showPosts(); // pulls all post data again to show our new post
    } catch (error) {
        console.error('Error adding post')
    }
}

// Event listeners
button.addEventListener("click", showPosts)
form.addEventListener("submit", addPost)
