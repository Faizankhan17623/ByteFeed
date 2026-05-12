import { useState, useEffect } from "react";
import axios from "axios";
import feeds from "./feeds";

const CORS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";
const MIN_LOADING_TIME = 15000; // 15 seconds minimum skeleton display

async function fetchFeed(feed) {
  try {
    const res = await axios.get(`${CORS_PROXY}${encodeURIComponent(feed.url)}&count=10`);
    if (res.data.status !== "ok") return [];
    return res.data.items.map((item) => ({
      id: item.guid || item.link,
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate),
      description: item.description
        ? item.description.replace(/<[^>]+>/g, "").slice(0, 200) + "..."
        : "",
      thumbnail: item.thumbnail || item.enclosure?.link || null,
      source: feed.name,
      category: feed.category,
      color: feed.color,
    }));
  } catch {
    return [];
  }
}

export default function useFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const startTime = Date.now();
      try {
        const results = await Promise.allSettled(feeds.map(fetchFeed));
        const all = results
          .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
          .sort((a, b) => b.pubDate - a.pubDate);

        // Always show skeleton for at least MIN_LOADING_TIME
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;
        if (remaining > 0) {
          await new Promise((res) => setTimeout(res, remaining));
        }

        setPosts(all);
      } catch (e) {
        setError("Failed to load feeds.");
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  return { posts, loading, error };
}
