import express from 'express'
import axios from 'axios'

const router = express.Router()
const BASE_URL = 'https://api.rawg.io/api/games'
const KEY = process.env.RAWG_API_KEY

//Juegos populares del mes
router.get('/popular', async (req, res) => {
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]

    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                key: KEY,
                dates: `${firstDay},${lastDay}`,
                ordering: '-added',
                page_size: 10
            }
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching popular games' })
    }
})

//Mejor valorados
router.get('/top-rated', async (req, res) => {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                key: KEY,
                ordering: '-metacritic',
                page_size: 10
            }
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching top-rated games' })
    }
})

//Próximos lanzamientos
router.get('/upcoming', async (req, res) => {
    const today = new Date().toISOString().split('T')[0]
    const nextYear = new Date()
    nextYear.setFullYear(nextYear.getFullYear() + 1)
    const nextYearStr = nextYear.toISOString().split('T')[0]

    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                key: KEY,
                dates: `${today},${nextYearStr}`,
                ordering: 'added',
                page_size: 10
            }
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching upcoming games' })
    }
})

//Tendencias (Mejor rating del año actual)
router.get('/trending', async (req, res) => {
    const year = new Date().getFullYear()
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                key: KEY,
                dates: `${year}-01-01,${year}-12-31`,
                ordering: '-rating',
                page_size: 10
            }
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching trending games' })
    }
})

router.get('/genres', async (req, res) => {
    try {
        const { data } = await axios.get('https://api.rawg.io/api/genres', {
            params: { key: KEY }
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching genres' })
    }
})

export default router