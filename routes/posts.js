
import express from 'express'
import {getPost,getPosts,createPost,updatePost,deletePost} from '../controllers/postController.js'

const router = express.Router()
// Post Routes
router.get('/:id', getPost)
router.get('/', getPosts)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router
