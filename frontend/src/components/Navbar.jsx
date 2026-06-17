import { motion } from 'framer-motion'

function Navbar() {
    return (
        <motion.nav
            className="navbar"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="navbar-inner">
                <span className="navbar-logo">
                    Games<span>Pilot</span>
                </span>
                <div className="navbar-links">
                    <a href="#popular">Populares</a>
                    <a href="#top-rated">Valorados</a>
                    <a href="#upcoming">Próximos</a>
                    <a href="#trending">Tendencias</a>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar