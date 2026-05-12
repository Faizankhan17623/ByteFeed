const STORAGE_KEY = "bytefeed_search_history";
const MAX = 6;

export function saveSearch(term) {
  if (!term.trim()) return;
  const history = getHistory().filter((h) => h !== term);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([term, ...history].slice(0, MAX)));
}

export function getHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function SearchHistory({ onSelect, onClose }) {
  const history = getHistory();
  if (history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <span>Recent searches</span>
        <button className="search-history-clear" onClick={() => { clearHistory(); onClose(); }}>Clear</button>
      </div>
      {history.map((term) => (
        <button key={term} className="search-history-item" onClick={() => onSelect(term)}>
          🕐 {term}
        </button>
      ))}
    </div>
  );
}
