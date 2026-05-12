export default function Header({ search, onSearch, theme, onToggleTheme, onOpenDrawer, bookmarkCount, readLaterCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">📡</span>
          <span className="logo-text">BlogFeed</span>
          <span className="logo-sub">AI · ML · Software Engineering</span>
        </div>

        <div className="header-actions">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-box"
              type="text"
              placeholder="Search posts, sources..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <button className="icon-btn" onClick={onToggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button className="icon-btn" onClick={() => onOpenDrawer("bookmarks")} title="Bookmarks">
            🔖
            {bookmarkCount > 0 && (
              <span style={{ fontSize: 9, position: "absolute", top: 4, right: 4, background: "#6366f1", color: "#fff", borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {bookmarkCount}
              </span>
            )}
          </button>

          <button className="icon-btn" onClick={() => onOpenDrawer("readlater")} title="Read Later">
            🕐
            {readLaterCount > 0 && (
              <span style={{ fontSize: 9, position: "absolute", top: 4, right: 4, background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {readLaterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
