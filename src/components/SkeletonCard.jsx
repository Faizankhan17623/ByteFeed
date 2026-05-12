export default function SkeletonCard() {
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
