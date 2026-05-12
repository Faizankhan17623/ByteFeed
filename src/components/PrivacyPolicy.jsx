export default function PrivacyPolicy({ onClose }) {
  return (
    <div className="drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="privacy-modal">
        <div className="privacy-header">
          <h2>Privacy Policy</h2>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="privacy-body">
          <p className="privacy-updated">Last updated: May 2026</p>

          <section className="privacy-section">
            <h3>About ByteFeed</h3>
            <p>
              ByteFeed is a free blog aggregator that collects and displays publicly available
              content from well-known software engineering, AI, and machine learning blogs. We do
              not create, own, or claim any rights over the content displayed on this site.
            </p>
          </section>

          <section className="privacy-section">
            <h3>Third-Party Content</h3>
            <p>
              All blog posts, titles, descriptions, and images shown on ByteFeed are sourced
              from the original publishers via their publicly available RSS/Atom feeds. ByteFeed
              does not host, copy, or store any third-party content on its own servers. Each post
              links directly back to the original source website.
            </p>
            <p>
              We use the <strong>rss2json.com</strong> API as a proxy to convert RSS feeds into
              JSON format readable by our web app. The original content remains owned by and
              attributed to its respective authors and publishers.
            </p>
          </section>

          <section className="privacy-section">
            <h3>Data We Collect</h3>
            <p>ByteFeed does <strong>not</strong> collect any personal data. Specifically:</p>
            <ul className="privacy-list">
              <li>We do not require you to create an account or log in.</li>
              <li>We do not track your reading habits or browsing history.</li>
              <li>We do not use cookies for tracking or advertising.</li>
              <li>Bookmarks and Read Later lists are stored only in your browser's local storage — they never leave your device.</li>
              <li>Your theme preference (dark/light) is also stored locally on your device only.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h3>Third-Party Services</h3>
            <p>ByteFeed uses the following third-party services:</p>
            <ul className="privacy-list">
              <li><strong>rss2json.com</strong> — converts RSS feeds to JSON. Their privacy policy applies when feeds are fetched.</li>
              <li><strong>Vercel</strong> — used for hosting this website. Vercel may collect standard server access logs (IP address, browser type) as part of their infrastructure.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h3>Copyright & DMCA</h3>
            <p>
              ByteFeed respects intellectual property rights. All content displayed is fetched
              from publicly available RSS feeds provided by the original publishers. If you are
              a content owner and believe your content is being displayed in a way that violates
              your rights, or if you would like your blog removed from ByteFeed, please contact
              us immediately and we will remove it within 48 hours.
            </p>
          </section>

          <section className="privacy-section">
            <h3>Disclaimer</h3>
            <p>
              ByteFeed is an independent project and is not affiliated with, endorsed by, or
              sponsored by any of the blogs or publishers whose content is aggregated. All
              trademarks and brand names belong to their respective owners.
            </p>
          </section>

          <section className="privacy-section privacy-contact">
            <h3>Contact Us</h3>
            <p>
              For any concerns regarding privacy, copyright, content removal requests, or
              anything else — please reach out directly:
            </p>
            <a href="mailto:faizankhan901152@gmail.com" className="privacy-email">
              📧 faizankhan901152@gmail.com
            </a>
            <p className="privacy-response">We aim to respond to all queries within 48 hours.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
