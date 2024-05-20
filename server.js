// main imports
import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url' // allows us to continue using static folder with ES modules
import posts from './routes/posts.js'

// middleware
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

// Server 
const SERVER_PORT = process.env.SERVER_PORT || 8000
export const SERVER_ADDRESS = `http://localhost:${SERVER_PORT}`

// Launch Server
const app = express()

// Get the directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// setup static folder
app.use(express.static(path.join(__dirname,'public')))

// Body parse middleware
app.use(express.json()) // for raw json
app.use(express.urlencoded({extended:false})) // for encoded data

// Logger middlewre
app.use(logger)

// Routes
app.use('/api/posts',posts)

// Error handler 
app.use(notFound)
app.use(errorHandler)

app.listen(SERVER_PORT, () => console.log(`Server is running on port http://localhost:${SERVER_PORT}`))

