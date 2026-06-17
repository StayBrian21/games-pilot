import { motion } from 'framer-motion'

function GameCard({ game, index = 0, onSelect }) {
    const image = game.background_image || null
    const rating = game.rating ? game.rating.toFixed(1) : null
    const metacritic = game.metacritic
    const platforms = game.platforms
        ?.slice(0, 3)
        .map(p => p.platform.name)
        .join(' · ') || ''

    return (
        <motion.div
            className="game-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{ y: -6 }}
            onClick={() => onSelect(game)}
        >
            {image ? (
                <img src={image} alt={game.name} />
            ) : (
                <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
            )}

            <div className="card-overlay" />

            {metacritic && (
                <div className="card-badge">{metacritic}</div>
            )}
            {!metacritic && rating && (
                <div className="card-badge green">{rating}</div>
            )}

            <div className="card-content">
                <p className="card-platforms">{platforms}</p>
                <h3 className="card-title">{game.name}</h3>
                <div className="card-meta">
                    {rating && <span className="card-rating">{rating} / 5</span>}
                    {game.genres?.slice(0, 1).map(g => (
                        <span key={g.id} className="card-genre">{g.name}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default GameCard