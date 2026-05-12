import { useEffect, useState } from "react";

export default function KeyboardShortcuts({ onToggleTheme, onOpenBookmarks, onOpenReadLater, searchRef }) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      // Don't fire when user is typing in input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        if (e.key === "Escape") e.target.blur();
        return;
      }

      switch (e.key.toLowerCase()) {
        case "/":
        case "k":
          e.preventDefault();
          searchRef?.current?.focus();
          break;
        case "t":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "d":
          onToggleTheme();
          break;
        case "b":
          onOpenBookmarks();
          break;
        case "r":
          onOpenReadLater();
          break;
        case "?":
          setShowHelp((v) => !v);
          break;
        case "escape":
          setShowHelp(false);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onToggleTheme, onOpenBookmarks, onOpenReadLater, searchRef]);

  if (!showHelp) return null;

  return (
    <div className="shortcuts-overlay" onClick={() => setShowHelp(false)}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h3>Keyboard Shortcuts</h3>
          <button className="drawer-close" onClick={() => setShowHelp(false)}>✕</button>
        </div>
        <div className="shortcuts-list">
          {[
            ["/  or  K", "Focus search"],
            ["T", "Scroll to top"],
            ["D", "Toggle dark / light mode"],
            ["B", "Open bookmarks"],
            ["R", "Open read later"],
            ["?", "Show / hide this panel"],
            ["Esc", "Close panel / blur search"],
          ].map(([key, desc]) => (
            <div key={key} className="shortcut-row">
              <span className="shortcut-key">{key}</span>
              <span className="shortcut-desc">{desc}</span>
            </div>
          ))}
        </div>
        <p className="shortcuts-hint">Press <strong>?</strong> anytime to toggle this panel</p>
      </div>
    </div>
  );
}
