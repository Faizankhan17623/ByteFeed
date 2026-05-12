import { useEffect } from "react";
import { getReadingTime } from "../utils/readingTime";

export default function PostModal({ post, onClose, isBookmarked, isReadLater, onBookmark, onReadLater, onShare }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const date = post.pubDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {post.thumbnail && (
          <img src={post.thumbnail} alt="" className="modal-img" onError={(e) => e.target.style.display = "none"} />
        )}

        <div className="modal-body">
          <div className="modal-meta">
            <span className="source-badge" style={{ background: post.color }}>{post.source}</span>
            <span className="category-tag">{post.category}</span>
            <span className="post-date">🗓 {date}</span>
            <span className="post-date">⏱ {getReadingTime(post.description)}</span>
          </div>

          <h2 className="modal-title">{post.title}</h2>
          <p className="modal-desc">{post.description}</p>

          <div className="modal-actions">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="modal-read-btn">
              Read Full Post ↗
            </a>
            <button className={`card-btn ${isBookmarked ? "bookmarked" : ""}`} onClick={() => onBookmark(post)}>
              {isBookmarked ? "🔖 Saved" : "🔖 Save"}
            </button>
            <button className={`card-btn ${isReadLater ? "read-later-active" : ""}`} onClick={() => onReadLater(post)}>
              {isReadLater ? "🕐 Added" : "🕐 Later"}
            </button>
            <button className="card-btn" onClick={() => onShare(post)}>🔗 Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
