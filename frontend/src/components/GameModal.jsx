import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function GameModal({ game, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    const rating = game.rating ? game.rating.toFixed(1) : null
    const platforms = game.platforms?.map(p => p.platform.name).join(' · ') || ''
    const genres = game.genres?.map(g => g.name).join(', ') || ''
    const released = game.released
        ? new Date(game.released).toLocaleDateString('es-MX', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : 'Por anunciar'

    const description = game.description_raw
        ? game.description_raw.slice(0, 300) + '...'
        : 'Sin descripción disponible.'

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-box"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Hero image */}
                    <div className="modal-hero">
                        {game.background_image && (
                            <img src={game.background_image} alt={game.name} />
                        )}
                        <div className="modal-hero-overlay" />
                        <button className="modal-close" onClick={onClose}>✕</button>
                        <div className="modal-hero-content">
                            {game.metacritic && (
                                <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '0.75rem' }}>
                                    Metacritic {game.metacritic}
                                </span>
                            )}
                            <h2 className="modal-title">{game.name}</h2>
                            {platforms && <p className="modal-platforms">{platforms}</p>}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <p className="modal-description">{description}</p>

                        <div className="modal-stats">
                            {rating && (
                                <div className="modal-stat">
                                    <span className="modal-stat-label">Rating</span>
                                    <span className="modal-stat-value green">{rating} / 5</span>
                                </div>
                            )}
                            <div className="modal-stat">
                                <span className="modal-stat-label">Lanzamiento</span>
                                <span className="modal-stat-value">{released}</span>
                            </div>
                            {genres && (
                                <div className="modal-stat">
                                    <span className="modal-stat-label">Géneros</span>
                                    <span className="modal-stat-value">{genres}</span>
                                </div>
                            )}
                            {game.playtime > 0 && (
                                <div className="modal-stat">
                                    <span className="modal-stat-label">Tiempo promedio</span>
                                    <span className="modal-stat-value">{game.playtime}h</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default GameModal