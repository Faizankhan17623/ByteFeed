import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import useFeed from "./useFeed";
import useLocalStorage from "./useLocalStorage";
import useToast from "./useToast";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import PostCard from "./components/PostCard";
import SkeletonCard from "./components/SkeletonCard";
import Drawer from "./components/Drawer";
import SourcesPage from "./components/SourcesPage";
import TrendingSection from "./components/TrendingSection";
import BackToTop from "./components/BackToTop";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import ReadingProgress from "./components/ReadingProgress";
import PostModal from "./components/PostModal";
import NewPostsBanner from "./components/NewPostsBanner";
import StatsDashboard from "./components/StatsDashboard";
import WelcomeScreen from "./components/WelcomeScreen";
import { updateStreak, getStreak } from "./utils/streak";
import feeds from "./feeds";
import "./App.css";

const PAGE_SIZE = 12;

export default function App() {
  const { posts, loading, error } = useFeed();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeSources, setActiveSources] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("feed");
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);
  const [readLater, setReadLater] = useLocalStorage("readLater", []);
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage("bytefeed_welcomed", false);
  const [streak, setStreak] = useState(0);
  const { toast, showToast } = useToast();
  const searchRef = useRef(null);
  const firstBookmark = useRef(bookmarks.length === 0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const s = updateStreak();
    setStreak(s);
  }, []);

  useEffect(() => { setPage(1); setLoadingMore(false); }, [search, category, activeSources]);

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
      showToast("✓ Bookmark removed");
    } else {
      // First ever bookmark — confetti!
      if (firstBookmark.current) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        firstBookmark.current = false;
      }
      setBookmarks([post, ...bookmarks]);
      showToast("🔖 Bookmarked!");
    }
  }

  function toggleReadLater(post) {
    const exists = readLater.find((b) => b.id === post.id);
    if (exists) {
      setReadLater(readLater.filter((b) => b.id !== post.id));
      showToast("✓ Removed from Read Later");
    } else {
      setReadLater([post, ...readLater]);
      showToast("🕐 Saved to Read Later!");
    }
  }

  function handleShare(post) {
    navigator.clipboard.writeText(post.link).then(() => showToast("🔗 Link copied!"));
  }

  function handleTwitterShare(post) {
    const text = encodeURIComponent(`"${post.title}" — via ByteFeed\n${post.link}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }

  function handleLoadMore() {
    setLoadingMore(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setLoadingMore(false);
    }, 800);
  }

  function handleWelcomeDone(selectedTopics) {
    if (selectedTopics.length > 0) setCategory(selectedTopics[0]);
    setHasSeenWelcome(true);
  }

  const uniqueSources = new Set(posts.map((p) => p.source)).size;

  return (
    <div className="app">
      <ReadingProgress />

      {!hasSeenWelcome && (
        <WelcomeScreen onDone={handleWelcomeDone} />
      )}

      <Header
        search={search}
        onSearch={setSearch}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenDrawer={(t) => setDrawerOpen(t)}
        bookmarkCount={bookmarks.length}
        readLaterCount={readLater.length}
        searchRef={searchRef}
        streak={streak}
      />

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-inner">
          <div className="hero-tag">✦ Updated in real time</div>
          <h1 className="hero-title">
            The Best of <span>AI, ML &</span><br />Software Engineering
          </h1>
          <p className="hero-desc">
            One place for the latest posts from the world's top technical blogs.
            No noise, no ads — just great content.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{feeds.length}</span>
              <span className="hero-stat-label">Sources</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">{loading ? "..." : posts.length}</span>
              <span className="hero-stat-label">Posts</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">Free</span>
              <span className="hero-stat-label">Always</span>
            </div>
          </div>
        </div>
      </div>

      <main className="main">
        <div className="nav-tabs">
          {[["feed", "📰", "Feed"], ["sources", "🌐", "Sources"], ["stats", "📊", "Stats"]].map(([key, icon, label]) => (
            <button
              key={key}
              className={`nav-tab ${tab === key ? "active" : ""}`}
              onClick={() => setTab(key)}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {tab === "sources" ? (
          <SourcesPage posts={posts} />
        ) : tab === "stats" ? (
          <StatsDashboard posts={posts} bookmarks={bookmarks} />
        ) : (
          <>
            <NewPostsBanner posts={posts} loading={loading} />

            {!loading && category === "All" && activeSources.length === 0 && !search && (
              <TrendingSection posts={posts} />
            )}

            <FilterBar
              activeCategory={category}
              onCategory={setCategory}
              activeSources={activeSources}
              onToggleSource={toggleSource}
              onClearAll={clearAll}
            />

            <div className="stats-bar">
              <div className="stats-left">
                <span className="stats-text">
                  Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> posts
                </span>
                {!loading && (
                  <div className="stats-pill">
                    <span className="stats-pill-dot" />
                    {uniqueSources} sources live
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="view-toggle">
                  <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="Grid view">⊞</button>
                  <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="List view">☰</button>
                </div>
              </div>
            </div>

            {loading && (
              <div className={`skeleton-grid ${view === "list" ? "grid-list" : ""}`}>
                {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} listView={view === "list"} />)}
              </div>
            )}

            {error && (
              <div className="status error">
                <span className="status-icon">⚠️</span>
                <p>Failed to load feeds. Please try again.</p>
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="status">
                <span className="status-icon">🔍</span>
                <p>No posts found. Try adjusting your filters.</p>
                <button className="status-action" onClick={clearAll}>Clear all filters</button>
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
                    onTwitterShare={handleTwitterShare}
                    onPreview={setPreviewPost}
                  />
                ))}
                {loadingMore && Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={`more-${i}`} listView={view === "list"} />
                ))}
              </div>
            )}

            {!loading && hasMore && !loadingMore && (
              <div className="load-more-wrap">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load more posts ↓
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
          onRemoveBookmark={(id) => { setBookmarks(bookmarks.filter((b) => b.id !== id)); showToast("✓ Removed"); }}
          onRemoveReadLater={(id) => { setReadLater(readLater.filter((b) => b.id !== id)); showToast("✓ Removed"); }}
        />
      )}

      {previewPost && (
        <PostModal
          post={previewPost}
          onClose={() => setPreviewPost(null)}
          isBookmarked={!!bookmarks.find((b) => b.id === previewPost.id)}
          isReadLater={!!readLater.find((b) => b.id === previewPost.id)}
          onBookmark={toggleBookmark}
          onReadLater={toggleReadLater}
          onShare={handleShare}
        />
      )}

      {toast && <div className="toast">{toast}</div>}

      <BackToTop />

      <KeyboardShortcuts
        searchRef={searchRef}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenBookmarks={() => setDrawerOpen("bookmarks")}
        onOpenReadLater={() => setDrawerOpen("readlater")}
      />

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <div className="footer-logo-icon">📡</div>
            <span className="footer-logo-text">ByteFeed</span>
          </div>
          <span className="footer-text">
            Made with <span style={{ color: "#f87171" }}>♥</span> by{" "}
            <strong style={{ color: "var(--text2)", fontWeight: 800 }}>Faizan Khan</strong>
          </span>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <a href="https://github.com/Faizankhan17623/ByteFeed" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
