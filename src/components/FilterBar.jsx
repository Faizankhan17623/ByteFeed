import feeds, { CATEGORIES } from "../feeds";

export default function FilterBar({ activeCategory, onCategory, activeSources, onToggleSource, onClearAll }) {
  const hasActiveFilters = activeCategory !== "All" || activeSources.length > 0;

  return (
    <div className="filter-section">
      <div className="filter-row">
        <span className="filter-label">Category</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onCategory(cat)}
          >
            {cat}
          </button>
        ))}
        {hasActiveFilters && (
          <button className="clear-filters" onClick={onClearAll}>
            ✕ Clear all
          </button>
        )}
      </div>

      <div className="tag-row">
        <span className="filter-label" style={{ marginRight: 4 }}>Sources</span>
        {feeds.map((feed) => {
          const isActive = activeSources.includes(feed.name);
          return (
            <button
              key={feed.name}
              className={`source-tag ${isActive ? "active" : ""}`}
              style={isActive ? { background: feed.color, borderColor: feed.color } : {}}
              onClick={() => onToggleSource(feed.name)}
            >
              <span className="source-dot" style={{ background: feed.color }} />
              {feed.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
