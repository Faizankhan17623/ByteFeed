import { getReadingTime } from "../utils/readingTime";

const CATEGORY_ICONS = {
  "AI": "🤖",
  "AI/ML": "🧠",
  "ML": "📊",
  "Software Engineering": "⚙️",
};

export default function PostCard({ post, isBookmarked, isReadLater, onBookmark, onReadLater, onShare, onTwitterShare, onPreview, listView }) {
  const date = post.pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const readTime = getReadingTime(post.description);
  const icon = CATEGORY_ICONS[post.category] || "📄";

  return (
    <div className="post-card">
      <div className="post-thumb-wrap" onClick={() => onPreview(post)} style={{ cursor: "pointer" }}>
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt=""
            className="post-thumb"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="post-thumb-placeholder"
          style={{
            display: post.thumbnail ? "none" : "flex",
            background: `linear-gradient(135deg, ${post.color}22, ${post.color}55)`,
            borderBottom: `3px solid ${post.color}`,
            flexDirection: "column", gap: 8,
          }}
        >
          <span style={{ fontSize: 36 }}>{icon}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: post.color, background: `${post.color}22`, padding: "3px 10px", borderRadius: 20 }}>
            {post.source}
          </span>
        </div>
      </div>

      <div className="post-body">
        <div className="post-meta">
          <span className="source-badge" style={{ background: post.color }}>{post.source}</span>
          <span className="category-tag">{post.category}</span>
          <span className="post-date">⏱ {readTime}</span>
          <span className="post-date" style={{ marginLeft: 0 }}>🗓 {date}</span>
        </div>

        <a href={post.link} target="_blank" rel="noopener noreferrer" className="post-title-link">
          <h2 className="post-title">{post.title}</h2>
        </a>

        <p className="post-desc">{post.description}</p>

        <div className="card-divider" />

        <div className="card-actions">
          <button className={`card-btn ${isBookmarked ? "bookmarked" : ""}`} onClick={() => onBookmark(post)}>
            {isBookmarked ? "🔖 Saved" : "🔖 Save"}
          </button>
          <button className={`card-btn ${isReadLater ? "read-later-active" : ""}`} onClick={() => onReadLater(post)}>
            {isReadLater ? "🕐 Added" : "🕐 Later"}
          </button>
          <button className="card-btn twitter-btn" onClick={() => onTwitterShare(post)} title="Share on X">
            𝕏
          </button>
          <button className="card-btn share-btn" onClick={() => onShare(post)}>🔗</button>
          <button className="card-btn" onClick={() => onPreview(post)} style={{ marginLeft: "auto" }}>
            👁 Preview
          </button>
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="card-btn read-link">
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}
