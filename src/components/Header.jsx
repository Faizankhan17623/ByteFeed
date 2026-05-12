import { useState, useRef, useEffect } from "react";
import SearchHistory, { saveSearch } from "./SearchHistory";

export default function Header({ search, onSearch, theme, onToggleTheme, onOpenDrawer, bookmarkCount, readLaterCount, searchRef, streak }) {
  const [showHistory, setShowHistory] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowHistory(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function handleSearch(val) {
    onSearch(val);
  }

  function handleBlur() {
    if (search.trim()) saveSearch(search.trim());
    setTimeout(() => setShowHistory(false), 150);
  }

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
          {streak > 1 && (
            <div className="streak-badge" title={`${streak} day streak!`}>
              🔥 {streak}d
            </div>
          )}

          <div className="search-wrap" ref={wrapRef} style={{ position: "relative" }}>
            <span className="search-icon">🔍</span>
            <input
              ref={searchRef}
              className="search-box"
              type="text"
              placeholder="Search posts, sources...  ( / )"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowHistory(true)}
              onBlur={handleBlur}
            />
            {showHistory && !search && (
              <SearchHistory
                onSelect={(term) => { onSearch(term); setShowHistory(false); }}
                onClose={() => setShowHistory(false)}
              />
            )}
          </div>

          <button className="icon-btn" onClick={onToggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button className="icon-btn" onClick={() => onOpenDrawer("bookmarks")} title="Bookmarks" style={{ position: "relative" }}>
            🔖
            {bookmarkCount > 0 && <span className="badge">{bookmarkCount}</span>}
          </button>

          <button className="icon-btn" onClick={() => onOpenDrawer("readlater")} title="Read Later" style={{ position: "relative" }}>
            🕐
            {readLaterCount > 0 && <span className="badge">{readLaterCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
