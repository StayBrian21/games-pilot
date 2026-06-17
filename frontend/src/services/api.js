const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/games'

export async function getPopularGames() {
    const res = await fetch(`${BASE_URL}/popular`)
    if (!res.ok) throw new Error('Error fetching popular games')
    return res.json()
}

export async function getTopRatedGames() {
    const res = await fetch(`${BASE_URL}/top-rated`)
    if (!res.ok) throw new Error('Error fetching top rated games')
    return res.json()
}

export async function getUpcomingGames() {
    const res = await fetch(`${BASE_URL}/upcoming`)
    if (!res.ok) throw new Error('Error fetching upcoming games')
    return res.json()
}

export async function getTrendingGames() {
    const res = await fetch(`${BASE_URL}/trending`)
    if (!res.ok) throw new Error('Error fetching trending games')
    return res.json()
}

export async function getGenres() {
    const res = await fetch(`${BASE_URL}/genres`)
    if (!res.ok) throw new Error('Error fetching genres')
    return res.json()
}