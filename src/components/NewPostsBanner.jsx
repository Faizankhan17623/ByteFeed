import { useState, useEffect } from "react";

const STORAGE_KEY = "bytefeed_last_visit";

export default function NewPostsBanner({ posts, loading }) {
  const [newCount, setNewCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (loading || posts.length === 0) return;

    const lastVisit = localStorage.getItem(STORAGE_KEY);
    if (lastVisit) {
      const lastTime = new Date(lastVisit);
      const count = posts.filter((p) => p.pubDate > lastTime).length;
      setNewCount(count);
    }
    // Update last visit timestamp
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  }, [loading, posts]);

  if (dismissed || newCount === 0) return null;

  return (
    <div className="new-posts-banner">
      <span className="new-posts-icon">✨</span>
      <span className="new-posts-text">
        <strong>{newCount} new post{newCount !== 1 ? "s" : ""}</strong> since your last visit
      </span>
      <button className="new-posts-dismiss" onClick={() => setDismissed(true)}>✕</button>
    </div>
  );
}
