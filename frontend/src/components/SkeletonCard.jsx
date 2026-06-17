function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-content">
                <div className="skeleton-line short" />
                <div className="skeleton-line long" />
                <div className="skeleton-line medium" />
            </div>
        </div>
    )
}

export default SkeletonCard