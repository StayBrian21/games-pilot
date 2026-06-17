import { useRef } from 'react'
import GameCard from './GameCard'

function ScrollRow({ games, onSelect }) {
    const rowRef = useRef(null)

    function scroll(direction) {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: direction === 'right' ? 700 : -700,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="scroll-row-wrapper">
            <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll('left')}>‹</button>
            <div className="games-grid" ref={rowRef}>
                {games.map((game, index) => (
                    <GameCard key={game.id} game={game} index={index} onSelect={onSelect} />
                ))}
            </div>
            <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll('right')}>›</button>
        </div>
    )
}

export default ScrollRow