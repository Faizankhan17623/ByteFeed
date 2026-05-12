import { useMemo } from "react";
import feeds from "../feeds";

export default function StatsDashboard({ posts, bookmarks }) {
  const stats = useMemo(() => {
    const byCategory = {};
    const bySource = {};
    const last24h = Date.now() - 86400000;
    const last7d = Date.now() - 7 * 86400000;
    let newToday = 0;
    let newThisWeek = 0;

    posts.forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      bySource[p.source] = (bySource[p.source] || 0) + 1;
      if (p.pubDate.getTime() > last24h) newToday++;
      if (p.pubDate.getTime() > last7d) newThisWeek++;
    });

    const topSource = Object.entries(bySource).sort((a, b) => b[1] - a[1])[0];
    const maxCat = Math.max(...Object.values(byCategory));

    const bookmarkSources = {};
    bookmarks.forEach((b) => {
      bookmarkSources[b.source] = (bookmarkSources[b.source] || 0) + 1;
    });
    const topBookmarked = Object.entries(bookmarkSources).sort((a, b) => b[1] - a[1])[0];

    return { byCategory, bySource, topSource, maxCat, newToday, newThisWeek, topBookmarked };
  }, [posts, bookmarks]);

  const categoryColors = {
    "AI": "#34a853", "AI/ML": "#1a73e8", "ML": "#ff9900", "Software Engineering": "#7c3aed",
  };

  return (
    <div className="stats-dashboard">
      <div className="stats-dash-header">
        <h2>📊 Stats Dashboard</h2>
        <p>Real-time insights from your ByteFeed</p>
      </div>

      {/* Top stat cards */}
      <div className="stats-cards">
        {[
          { icon: "📰", label: "Total Posts", value: posts.length },
          { icon: "🌐", label: "Sources", value: feeds.length },
          { icon: "🔥", label: "New Today", value: stats.newToday },
          { icon: "📅", label: "This Week", value: stats.newThisWeek },
          { icon: "🔖", label: "Bookmarks", value: bookmarks.length },
        ].map((s) => (
          <div key={s.label} className="stats-card">
            <span className="stats-card-icon">{s.icon}</span>
            <span className="stats-card-value">{s.value}</span>
            <span className="stats-card-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Posts by category bar chart */}
      <div className="stats-section">
        <h3 className="stats-section-title">Posts by Category</h3>
        <div className="stats-bars">
          {Object.entries(stats.byCategory).map(([cat, count]) => (
            <div key={cat} className="stats-bar-row">
              <span className="stats-bar-label">{cat}</span>
              <div className="stats-bar-track">
                <div
                  className="stats-bar-fill"
                  style={{
                    width: `${(count / stats.maxCat) * 100}%`,
                    background: categoryColors[cat] || "#6366f1",
                  }}
                />
              </div>
              <span className="stats-bar-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top blogs */}
      <div className="stats-section">
        <h3 className="stats-section-title">Top Blogs by Post Count</h3>
        <div className="stats-top-list">
          {Object.entries(stats.bySource)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([source, count], i) => {
              const feed = feeds.find((f) => f.name === source);
              return (
                <div key={source} className="stats-top-item">
                  <span className="stats-top-rank">#{i + 1}</span>
                  <span className="stats-top-dot" style={{ background: feed?.color || "#6366f1" }} />
                  <span className="stats-top-name">{source}</span>
                  <span className="stats-top-count">{count} posts</span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Highlights */}
      <div className="stats-section">
        <h3 className="stats-section-title">Highlights</h3>
        <div className="stats-highlights">
          {stats.topSource && (
            <div className="stats-highlight-card">
              <span className="stats-highlight-icon">🏆</span>
              <div>
                <p className="stats-highlight-title">Most Active Blog</p>
                <p className="stats-highlight-value">{stats.topSource[0]}</p>
                <p className="stats-highlight-sub">{stats.topSource[1]} posts loaded</p>
              </div>
            </div>
          )}
          {stats.topBookmarked ? (
            <div className="stats-highlight-card">
              <span className="stats-highlight-icon">🔖</span>
              <div>
                <p className="stats-highlight-title">Most Bookmarked</p>
                <p className="stats-highlight-value">{stats.topBookmarked[0]}</p>
                <p className="stats-highlight-sub">{stats.topBookmarked[1]} bookmarks</p>
              </div>
            </div>
          ) : (
            <div className="stats-highlight-card">
              <span className="stats-highlight-icon">🔖</span>
              <div>
                <p className="stats-highlight-title">Most Bookmarked</p>
                <p className="stats-highlight-value">No bookmarks yet</p>
                <p className="stats-highlight-sub">Start saving posts!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
