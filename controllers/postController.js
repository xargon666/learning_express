// post data (would normally be in a database or something)
let posts = [
    { id: 0, title: 'Post One' },
    { id: 1, title: 'Post Two' },
    { id: 2, title: 'Post Three' }
]

// @ desc   Get posts
// @route   /api/posts/
export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit)
    if (!isNaN(limit) && limit > 0) {
        return res
            .status(200)
            .json(posts.slice(0, limit))
    }

    res.status(200).json(posts)
}

// @ desc   Get single post
// @route   /api/posts/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id) // parse string into number
    const post = posts.find((post) => post.id === id)

    // error handling
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }

    res.status(200).json(post)
}


// @ desc   Create a post
// @route   /api/posts/
export const createPost = (req, res, next) => {
    const newPostId = posts.length + 1
    const newPost = {
        id: newPostId,
        title: req.body.title
    }
    // error handling
    if (!newPost.title) {
        const error = new Error(`Please include a title`)
        error.status = 400
        return next(error)
    }

    posts.push(newPost)
    res
        .status(201)
        .json(posts)
} 

// @ desc   Update post
// @route   /api/posts/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)

    // error handling
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }

    post.title = req.body.title
    res.status(200).json(posts)
}

// @ desc   Delete post
// @route   /api/posts/:id
export const deletePost = (req, res, next) => {
    // find post by id
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)

    // error handling
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }

    // update database
    posts.filter((post) => post.id === id)
    // return post
    res.status(200).json(posts)
}


