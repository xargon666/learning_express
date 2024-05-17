
import express from 'express'
const router = express.Router()
// post data (would normally be in a database or something)
let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' }
]
// Missing Post msg
const missingPost = (id) => {
    if (isNaN(id)) return { msg: 'Please search for a valid post id number' }
    return { msg: `A post with the id of ${id} was not found.` }
}

// Get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)
    if (!isNaN(limit) && limit > 0) {
        return res
            .status(200)
            .json(posts.slice(0, limit))
    }

    res.status(200).json(posts)
})

// Get single post
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id) // parse string into number
    const post = posts.find((post) => post.id === id)
    if (!post) {
        return res
            .status(404)
            .json(missingPost(id))
    }

    res.status(200).json(post)
})

// Create a new post
router.post('/', (req, res) => {
    console.log(req.body)
    const newPostId = posts.length + 1
    const newPost = {
        id: newPostId,
        title: req.body.title
    }
    if (!newPost.title) {
        return res
            .status(400)
            .json({ msg: 'Please include a title' })
    }
    posts.push(newPost)
    res
    .status(201).json(posts)
})


// Update a post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)

    if (!post) {
        return res
            .status(404)
            .json(missingPost(id))
    }

    post.title = req.body.title
    res.status(200).json(posts)
})

// Delete Post

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)

    if (!post) {
        return res
            .status(404)
            .json(missingPost(id))
    }

    posts.filter((post) => post.id === id)
    res.status(200).json(posts)
})

export default router
