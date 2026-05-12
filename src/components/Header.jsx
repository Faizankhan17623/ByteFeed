export default function Header({ search, onSearch, theme, onToggleTheme, onOpenDrawer, bookmarkCount, readLaterCount, searchRef }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" href="/">
          <div className="logo-icon-wrap">📡</div>
          <div className="logo-text-wrap">
            <span className="logo-text">ByteFeed</span>
            <span className="logo-sub">AI · ML · Engineering</span>
          </div>
        </a>

        <div className="header-actions">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              ref={searchRef}
              className="search-box"
              type="text"
              placeholder="Search posts, sources...  ( / )"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <button className="icon-btn" onClick={onToggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button className="icon-btn" onClick={() => onOpenDrawer("bookmarks")} title="Bookmarks">
            🔖
            {bookmarkCount > 0 && <span className="badge">{bookmarkCount}</span>}
          </button>

          <button className="icon-btn" onClick={() => onOpenDrawer("readlater")} title="Read Later">
            🕐
            {readLaterCount > 0 && <span className="badge">{readLaterCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
