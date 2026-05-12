export default function PostCard({ post, isBookmarked, isReadLater, onBookmark, onReadLater, onShare, listView }) {
  const date = post.pubDate.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="post-card">
      <div className="post-thumb-wrap">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt=""
            className="post-thumb"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
            }}
          />
        ) : null}
        {!post.thumbnail && (
          <div className="post-thumb-placeholder">📄</div>
        )}
      </div>

      <div className="post-body">
        <div className="post-meta">
          <span className="source-badge" style={{ background: post.color }}>
            {post.source}
          </span>
          <span className="category-tag">{post.category}</span>
          <span className="post-date">🗓 {date}</span>
        </div>

        <a href={post.link} target="_blank" rel="noopener noreferrer" className="post-title-link">
          <h2 className="post-title">{post.title}</h2>
        </a>

        <p className="post-desc">{post.description}</p>

        <div className="card-divider" />

        <div className="card-actions">
          <button
            className={`card-btn ${isBookmarked ? "bookmarked" : ""}`}
            onClick={() => onBookmark(post)}
          >
            {isBookmarked ? "🔖 Saved" : "🔖 Save"}
          </button>

          <button
            className={`card-btn ${isReadLater ? "read-later-active" : ""}`}
            onClick={() => onReadLater(post)}
          >
            {isReadLater ? "🕐 Added" : "🕐 Later"}
          </button>

          <button className="card-btn share-btn" onClick={() => onShare(post)}>
            🔗 Share
          </button>

          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-btn read-link"
            style={{ marginLeft: "auto" }}
          >
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}
