export default function TrendingSection({ posts }) {
  // Latest 5 posts from last 48 hours, else just latest 5
  const now = Date.now();
  const recent = posts
    .filter((p) => now - p.pubDate.getTime() < 48 * 60 * 60 * 1000)
    .slice(0, 5);
  const trending = recent.length >= 3 ? recent : posts.slice(0, 5);

  if (!trending.length) return null;

  return (
    <div className="trending-section">
      <div className="trending-header">
        <span className="trending-badge">🔥 Trending Now</span>
        <span className="trending-sub">Latest from the last 48 hours</span>
      </div>
      <div className="trending-list">
        {trending.map((post, i) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="trending-item"
          >
            <span className="trending-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="trending-content">
              <p className="trending-title">{post.title}</p>
              <div className="trending-meta">
                <span className="source-badge" style={{ background: post.color, fontSize: 9, padding: "2px 8px" }}>
                  {post.source}
                </span>
                <span className="trending-date">
                  {post.pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
            <span className="trending-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
