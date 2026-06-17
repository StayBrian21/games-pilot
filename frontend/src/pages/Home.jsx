import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    getPopularGames,
    getTopRatedGames,
    getUpcomingGames,
    getTrendingGames,
    getGenres
} from '../services/api'
import ScrollRow from '../components/ScrollRow'
import SkeletonCard from '../components/SkeletonCard'
import Navbar from '../components/Navbar'
import GameModal from '../components/GameModal'
import GenreFilter from '../components/GenreFilter'

function SkeletonRow() {
    return (
        <div className="games-grid">
            {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )
}

function Section({ title, games, id, loading, onSelect }) {
    return (
        <motion.section
            id={id}
            className="section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
        >
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <div className="section-divider" />
                {!loading && <span className="section-count">{games.length} juegos</span>}
            </div>
            {loading ? <SkeletonRow /> : <ScrollRow games={games} onSelect={onSelect} />}
        </motion.section>
    )
}

function filterByGenre(games, slug) {
    if (!slug) return games
    return games.filter(g => g.genres?.some(genre => genre.slug === slug))
}

function Home() {
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [trending, setTrending] = useState([])
    const [genres, setGenres] = useState([])
    const [activeGenre, setActiveGenre] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedGame, setSelectedGame] = useState(null)

    useEffect(() => {
        async function fetchAll() {
            try {
                const [pop, top, up, trend, gen] = await Promise.all([
                    getPopularGames(),
                    getTopRatedGames(),
                    getUpcomingGames(),
                    getTrendingGames(),
                    getGenres()
                ])
                setPopular(pop.results || [])
                setTopRated(top.results || [])
                setUpcoming(up.results || [])
                setTrending(trend.results || [])
                setGenres((gen.results || []).slice(0, 10))
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])

    const filteredPopular = filterByGenre(popular, activeGenre)
    const filteredTopRated = filterByGenre(topRated, activeGenre)
    const filteredUpcoming = filterByGenre(upcoming, activeGenre)
    const filteredTrending = filterByGenre(trending, activeGenre)

    return (
        <div>
            <Navbar />
            <div className="page-wrapper" style={{ paddingTop: '60px' }}>
                <motion.header
                    className="site-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="header-eyebrow">Game Dashboard — VIDEOGAMES</p>
                    <h1 className="header-title">Games<span>Pilot</span></h1>
                    <p className="header-subtitle">Estadísticas en tiempo real del mundo gamer</p>
                </motion.header>

                {!loading && (
                    <GenreFilter
                        genres={genres}
                        active={activeGenre}
                        onChange={setActiveGenre}
                    />
                )}

                <Section id="popular" title="Populares este mes" games={filteredPopular} loading={loading} onSelect={setSelectedGame} />
                <Section id="top-rated" title="Mejor valorados" games={filteredTopRated} loading={loading} onSelect={setSelectedGame} />
                <Section id="upcoming" title="Próximos lanzamientos" games={filteredUpcoming} loading={loading} onSelect={setSelectedGame} />
                <Section id="trending" title="Tendencias" games={filteredTrending} loading={loading} onSelect={setSelectedGame} />

                <footer className="site-footer">
                    <span className="footer-logo">Games<span>Pilot</span></span>
                    <span className="footer-text">Datos provistos por RAWG.io — {new Date().getFullYear()}</span>
                </footer>
            </div>

            {selectedGame && (
                <GameModal
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                />
            )}
        </div>
    )
}

export default Home