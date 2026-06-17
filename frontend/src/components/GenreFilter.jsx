import { motion } from 'framer-motion'

function GenreFilter({ genres, active, onChange }) {
    return (
        <motion.div
            className="genre-filter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
        >
            <button
                className={`genre-btn ${active === null ? 'active' : ''}`}
                onClick={() => onChange(null)}
            >
                Todos
            </button>
            {genres.map(genre => (
                <button
                    key={genre.id}
                    className={`genre-btn ${active === genre.slug ? 'active' : ''}`}
                    onClick={() => onChange(genre.slug)}
                >
                    {genre.name}
                </button>
            ))}
        </motion.div>
    )
}

export default GenreFilter