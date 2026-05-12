import { useState } from "react";

export default function Drawer({ onClose, bookmarks, readLater, onRemoveBookmark, onRemoveReadLater, initialTab }) {
  const [tab, setTab] = useState(initialTab || "bookmarks");

  const list = tab === "bookmarks" ? bookmarks : readLater;
  const onRemove = tab === "bookmarks" ? onRemoveBookmark : onRemoveReadLater;
  const emptyMsg = tab === "bookmarks"
    ? { icon: "🔖", text: "No bookmarks yet. Click 'Save' on any post to bookmark it." }
    : { icon: "🕐", text: "No posts saved for later. Click 'Later' on any post." };

  return (
    <div className="drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="drawer">
        <div className="drawer-header">
          <h2>{tab === "bookmarks" ? "🔖 Bookmarks" : "🕐 Read Later"}</h2>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-tabs">
          <button className={`drawer-tab ${tab === "bookmarks" ? "active" : ""}`} onClick={() => setTab("bookmarks")}>
            Bookmarks ({bookmarks.length})
          </button>
          <button className={`drawer-tab ${tab === "readlater" ? "active" : ""}`} onClick={() => setTab("readlater")}>
            Read Later ({readLater.length})
          </button>
        </div>

        <div className="drawer-list">
          {list.length === 0 ? (
            <div className="drawer-empty">
              <div className="empty-icon">{emptyMsg.icon}</div>
              <p>{emptyMsg.text}</p>
            </div>
          ) : (
            list.map((post) => (
              <div key={post.id} className="drawer-item">
                <div className="drawer-item-title">{post.title}</div>
                <div className="drawer-item-meta">
                  <span className="source-badge" style={{ background: post.color, fontSize: 10, padding: "2px 8px" }}>
                    {post.source}
                  </span>
                  <span className="drawer-item-source">
                    {post.pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="drawer-item-actions">
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="drawer-item-link">
                    Read Post ↗
                  </a>
                  <button className="drawer-item-remove" onClick={() => onRemove(post.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
