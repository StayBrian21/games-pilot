import express from 'express'
import cors from 'cors'
import gamesRouter from './routes/games.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    next()
})

app.use('/api/games', gamesRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})