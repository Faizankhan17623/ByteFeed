export default function PostCard({ post, isBookmarked, isReadLater, onBookmark, onReadLater, onShare, listView }) {
  const date = post.pubDate.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="post-card">
      {post.thumbnail && !listView && (
        <img
          src={post.thumbnail}
          alt=""
          className="post-thumb"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      {post.thumbnail && listView && (
        <img
          src={post.thumbnail}
          alt=""
          className="post-thumb"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <div className="post-body">
        <div className="post-meta">
          <span className="source-badge" style={{ background: post.color }}>
            {post.source}
          </span>
          <span className="category-tag">{post.category}</span>
          <span className="post-date">{date}</span>
        </div>

        <a href={post.link} target="_blank" rel="noopener noreferrer">
          <h2 className="post-title">{post.title}</h2>
        </a>

        <p className="post-desc">{post.description}</p>

        <div className="card-actions">
          <button
            className={`card-btn ${isBookmarked ? "bookmarked" : ""}`}
            onClick={() => onBookmark(post)}
            title={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            {isBookmarked ? "🔖 Saved" : "🔖 Save"}
          </button>

          <button
            className={`card-btn read-later ${isReadLater ? "bookmarked" : ""}`}
            onClick={() => onReadLater(post)}
            title={isReadLater ? "Remove from Read Later" : "Read Later"}
          >
            {isReadLater ? "🕐 Added" : "🕐 Later"}
          </button>

          <button
            className="card-btn share-btn"
            onClick={() => onShare(post)}
            title="Copy link"
          >
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  );
}
