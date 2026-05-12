import { useState } from "react";
import { CATEGORIES } from "../feeds";

const topics = CATEGORIES.filter((c) => c !== "All");

export default function WelcomeScreen({ onDone }) {
  const [selected, setSelected] = useState([]);

  function toggle(cat) {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function handleStart() {
    onDone(selected.length > 0 ? selected : []);
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <div className="welcome-icon">📡</div>
        <h1 className="welcome-title">Welcome to ByteFeed</h1>
        <p className="welcome-desc">
          Your one-stop feed for AI, ML & Software Engineering blogs.<br />
          What topics do you care about most?
        </p>

        <div className="welcome-topics">
          {topics.map((cat) => (
            <button
              key={cat}
              className={`welcome-topic-btn ${selected.includes(cat) ? "active" : ""}`}
              onClick={() => toggle(cat)}
            >
              {selected.includes(cat) ? "✓ " : ""}{cat}
            </button>
          ))}
        </div>

        <p className="welcome-hint">
          {selected.length === 0 ? "Select topics or skip to see everything" : `${selected.length} topic${selected.length > 1 ? "s" : ""} selected`}
        </p>

        <button className="welcome-start-btn" onClick={handleStart}>
          {selected.length === 0 ? "Show Everything →" : "Start Reading →"}
        </button>
      </div>
    </div>
  );
}
