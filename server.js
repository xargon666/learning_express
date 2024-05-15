import express from 'express'
import path from 'path'
import posts from './roues/posts'
const SERVER_PORT = process.env.SERVER_PORT || 8000

const app = express()
// setup static folder
// app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/api/posts',posts)


app.listen(SERVER_PORT, () => console.log(`Server is running on port http://localhost:${SERVER_PORT}`))
