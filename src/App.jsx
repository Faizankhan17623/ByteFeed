import { useState, useEffect, useMemo } from "react";
import useFeed from "./useFeed";
import useLocalStorage from "./useLocalStorage";
import useToast from "./useToast";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import PostCard from "./components/PostCard";
import SkeletonCard from "./components/SkeletonCard";
import Drawer from "./components/Drawer";
import SourcesPage from "./components/SourcesPage";
import "./App.css";

const PAGE_SIZE = 12;

export default function App() {
  const { posts, loading, error } = useFeed();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeSources, setActiveSources] = useState([]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("feed");
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);
  const [readLater, setReadLater] = useLocalStorage("readLater", []);
  const { toast, showToast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // reset page when filters change
  useEffect(() => { setPage(1); }, [search, category, activeSources]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchSource = activeSources.length === 0 || activeSources.includes(p.source);
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.source.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSource && matchSearch;
    });
  }, [posts, search, category, activeSources]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  function toggleSource(name) {
    setActiveSources((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function clearAll() {
    setCategory("All");
    setActiveSources([]);
    setSearch("");
  }

  function toggleBookmark(post) {
    const exists = bookmarks.find((b) => b.id === post.id);
    if (exists) {
      setBookmarks(bookmarks.filter((b) => b.id !== post.id));
      showToast("Bookmark removed");
    } else {
      setBookmarks([post, ...bookmarks]);
      showToast("Bookmarked!");
    }
  }

  function toggleReadLater(post) {
    const exists = readLater.find((b) => b.id === post.id);
    if (exists) {
      setReadLater(readLater.filter((b) => b.id !== post.id));
      showToast("Removed from Read Later");
    } else {
      setReadLater([post, ...readLater]);
      showToast("Saved to Read Later!");
    }
  }

  function handleShare(post) {
    navigator.clipboard.writeText(post.link).then(() => showToast("Link copied!"));
  }

  return (
    <div className="app">
      <Header
        search={search}
        onSearch={setSearch}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenDrawer={(t) => setDrawerOpen(t)}
        bookmarkCount={bookmarks.length}
        readLaterCount={readLater.length}
      />

      <main className="main">
        <div className="nav-tabs">
          {[["feed", "📰 Feed"], ["sources", "🌐 Sources"]].map(([key, label]) => (
            <button
              key={key}
              className={`nav-tab ${tab === key ? "active" : ""}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "sources" ? (
          <SourcesPage posts={posts} />
        ) : (
          <>
            <FilterBar
              activeCategory={category}
              onCategory={setCategory}
              activeSources={activeSources}
              onToggleSource={toggleSource}
              onClearAll={clearAll}
            />

            <div className="stats-bar">
              <span>
                Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> posts
                from <strong>{new Set(filtered.map((p) => p.source)).size}</strong> sources
              </span>
              <div className="view-toggle">
                <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="Grid view">⊞</button>
                <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="List view">☰</button>
              </div>
            </div>

            {loading && (
              <div className="skeleton-grid">
                {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {error && <div className="status error">{error}</div>}

            {!loading && !error && filtered.length === 0 && (
              <div className="status">
                <span style={{ fontSize: 36 }}>🔍</span>
                <p>No posts found. Try adjusting your filters.</p>
                <button className="clear-filters" onClick={clearAll} style={{ fontSize: 14, padding: "8px 16px", border: "1px solid var(--border)", borderRadius: 8 }}>
                  Clear all filters
                </button>
              </div>
            )}

            {!loading && (
              <div className={`grid ${view === "list" ? "grid-list" : "grid-3"}`}>
                {paginated.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    listView={view === "list"}
                    isBookmarked={!!bookmarks.find((b) => b.id === post.id)}
                    isReadLater={!!readLater.find((b) => b.id === post.id)}
                    onBookmark={toggleBookmark}
                    onReadLater={toggleReadLater}
                    onShare={handleShare}
                  />
                ))}
              </div>
            )}

            {!loading && hasMore && (
              <div className="load-more-wrap">
                <button className="load-more-btn" onClick={() => setPage((p) => p + 1)}>
                  Load more posts
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {drawerOpen && (
        <Drawer
          initialTab={drawerOpen}
          onClose={() => setDrawerOpen(null)}
          bookmarks={bookmarks}
          readLater={readLater}
          onRemoveBookmark={(id) => { setBookmarks(bookmarks.filter((b) => b.id !== id)); showToast("Removed"); }}
          onRemoveReadLater={(id) => { setReadLater(readLater.filter((b) => b.id !== id)); showToast("Removed"); }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}

      <footer className="footer">
        <p>BlogFeed — Aggregating the best of AI, ML & Software Engineering · {new Set(posts.map(p => p.source)).size} sources · {posts.length} posts</p>
      </footer>
    </div>
  );
}
