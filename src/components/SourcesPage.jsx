import feeds from "../feeds";

export default function SourcesPage({ posts }) {
  const countBySource = posts.reduce((acc, p) => {
    acc[p.source] = (acc[p.source] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
          All Sources
        </h2>
        <p style={{ fontSize: 13, color: "var(--text3)" }}>
          {feeds.length} blogs being aggregated
        </p>
      </div>

      <div className="sources-grid">
        {feeds.map((feed) => (
          <div key={feed.name} className="source-card">
            <div className="source-card-top">
              <span className="source-color-dot" style={{ background: feed.color }} />
              <span className="source-card-name">{feed.name}</span>
            </div>
            <span className="source-card-cat">{feed.category}</span>
            <div className="source-card-count">
              <strong>{countBySource[feed.name] || 0}</strong> posts loaded
            </div>
            <a
              href={feed.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-card-link"
            >
              RSS Feed ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
