export default function SkeletonCard({ listView }) {
  if (listView) {
    return (
      <div className="skeleton-card" style={{ flexDirection: "row", display: "flex" }}>
        <div className="skeleton-line" style={{ width: 200, minHeight: 140, flexShrink: 0, borderRadius: 0 }} />
        <div className="skeleton-body" style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div className="skeleton-line short" />
            <div className="skeleton-line" style={{ width: "18%" }} />
          </div>
          <div className="skeleton-line title" />
          <div className="skeleton-line title2" />
          <div className="skeleton-line long" />
          <div className="skeleton-line" style={{ width: "28%", marginTop: 4 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton-line" />
      <div className="skeleton-body">
        <div style={{ display: "flex", gap: 8 }}>
          <div className="skeleton-line short" />
          <div className="skeleton-line" style={{ width: "22%" }} />
        </div>
        <div className="skeleton-line title" />
        <div className="skeleton-line title2" />
        <div className="skeleton-line long" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line" style={{ width: "28%", marginTop: 4 }} />
      </div>
    </div>
  );
}
