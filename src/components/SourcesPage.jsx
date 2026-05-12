import feeds from "../feeds";

export default function SourcesPage({ posts }) {
  const countBySource = posts.reduce((acc, p) => {
    acc[p.source] = (acc[p.source] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="sources-header">
        <h2>All Sources</h2>
        <p>{feeds.length} blogs being tracked — updated in real time via RSS</p>
      </div>

      <div className="sources-grid">
        {feeds.map((feed) => (
          <div key={feed.name} className="source-card" style={{ "--source-color": feed.color }}>
            <div className="source-card-top">
              <div className="source-color-bar" style={{ background: feed.color }} />
              <div className="source-card-info">
                <span className="source-card-name">{feed.name}</span>
                <span className="source-card-cat">{feed.category}</span>
              </div>
            </div>

            <div className="source-card-count">
              <strong>{countBySource[feed.name] || 0}</strong> posts loaded
            </div>

            <a
              href={feed.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="source-card-link"
            >
              Visit Blog ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
