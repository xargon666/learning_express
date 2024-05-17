import express from 'express'
import path from 'path'
import posts from './routes/posts.js'
const SERVER_PORT = process.env.SERVER_PORT || 8000

const app = express()
// setup static folder
// app.use(express.static(path.join(__dirname,'public')))

// Body parse middleware
app.use(express.json()) // for raw json
app.use(express.urlencoded({extended:false})) // for encoded data

// Routes
app.use('/api/posts',posts)

app.listen(SERVER_PORT, () => console.log(`Server is running on port http://localhost:${SERVER_PORT}`))
 