# 📡 ByteFeed

> A beautiful, real-time blog aggregator for AI, ML & Software Engineering — built with React + Vite.

**Live Site:** [bytefeed.store](https://bytefeed.store)

---

## 🚀 What is ByteFeed?

ByteFeed is a free, open-source blog aggregator that collects the latest posts from 22 of the world's top technical blogs — all in one place. No ads, no noise, no login required.

It fetches posts in real time via public RSS feeds and displays them in a clean, professional UI with powerful filtering, search, and personalization features.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📰 **Live Feed** | Real-time posts from 22 top blogs via RSS |
| 🔍 **Search** | Search by title, source, or description |
| 🕐 **Search History** | Recent searches saved locally |
| 🏷️ **Category Filter** | Filter by AI, AI/ML, ML, Software Engineering |
| 🔖 **Source Filter** | Filter by specific blog source |
| 🔥 **Trending Section** | Top 5 posts from the last 48 hours |
| 👁️ **Post Preview Modal** | Preview any post without leaving the page |
| ⏱️ **Reading Time** | Estimated read time on every post card |
| 📊 **Stats Dashboard** | Charts, top blogs, post counts, highlights |
| 🌐 **Sources Page** | All 22 blogs with post counts and links |
| 🔖 **Bookmarks** | Save posts to read later (stored locally) |
| 🕐 **Read Later** | Separate read later list |
| ✨ **New Posts Banner** | Shows how many posts are new since last visit |
| 🎉 **Confetti** | Fires on your very first bookmark |
| 𝕏 **Twitter Share** | Share any post to Twitter/X in one click |
| 🔗 **Copy Link** | Copy post URL to clipboard |
| ☀️ **Dark / Light Mode** | Toggle with preference saved locally |
| ⊞ **Grid / List View** | Switch between card grid and compact list |
| ⌨️ **Keyboard Shortcuts** | Press `?` to see all shortcuts |
| 🔼 **Back to Top** | Floating button that stays above the footer |
| 📈 **Reading Progress** | Thin progress bar at the top while scrolling |
| 🔥 **Streak Counter** | Tracks your consecutive daily visit streak |
| 🎯 **Welcome Screen** | Personalized topic selection on first visit |
| 💀 **Skeleton UI** | Smooth loading skeletons for all states |
| 🔒 **Privacy Policy** | Full policy at `/privacy` |

---

## 📡 Sources (22 Blogs)

### AI
- Google AI Blog
- OpenAI Blog
- MIT Technology Review
- Simon Willison's Blog
- Google DeepMind
- BAIR Blog (Berkeley AI Research)

### AI/ML
- Towards Data Science
- Hugging Face Blog
- Andrej Karpathy
- The Gradient

### ML
- Sebastian Raschka
- AWS Machine Learning Blog
- fast.ai Blog
- Eugene Yan
- Weights & Biases
- Chip Huyen

### Software Engineering
- Dev.to
- The Pragmatic Engineer
- Martin Fowler
- Stack Overflow Blog
- Netflix Tech Blog
- Hacker News

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router** | Client-side routing |
| **Axios** | HTTP requests |
| **rss2json API** | Converts RSS feeds to JSON |
| **canvas-confetti** | First bookmark celebration |
| **Vercel** | Hosting & deployment |

---

## 🏃 Run Locally

```bash
# Clone the repo
git clone https://github.com/Faizankhan17623/ByteFeed.git
cd ByteFeed

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Deploy

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

```bash
# Build for production
npm run build

# Deploy manually
vercel --prod
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` or `K` | Focus search |
| `T` | Scroll to top |
| `D` | Toggle dark / light mode |
| `B` | Open bookmarks |
| `R` | Open read later |
| `?` | Show / hide shortcuts panel |
| `Esc` | Close panel / blur search |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top navigation with search & actions
│   ├── FilterBar.jsx       # Category & source filters
│   ├── PostCard.jsx        # Individual blog post card
│   ├── PostModal.jsx       # Post preview modal
│   ├── SkeletonCard.jsx    # Loading skeleton
│   ├── TrendingSection.jsx # Trending posts (last 48h)
│   ├── StatsDashboard.jsx  # Stats tab with charts
│   ├── SourcesPage.jsx     # All sources listing
│   ├── Drawer.jsx          # Bookmarks & Read Later drawer
│   ├── BackToTop.jsx       # Floating back to top button
│   ├── ReadingProgress.jsx # Scroll progress bar
│   ├── NewPostsBanner.jsx  # New posts since last visit
│   ├── SearchHistory.jsx   # Recent searches dropdown
│   ├── WelcomeScreen.jsx   # First-time visitor welcome
│   ├── KeyboardShortcuts.jsx # Shortcuts modal
│   └── PrivacyPolicy.jsx   # Privacy policy page
├── utils/
│   ├── readingTime.js      # Reading time estimator
│   └── streak.js           # Daily visit streak tracker
├── feeds.js                # All 22 RSS feed sources
├── useFeed.js              # RSS fetching hook
├── useLocalStorage.js      # localStorage hook
├── useToast.js             # Toast notification hook
├── App.jsx                 # Main app component
├── App.css                 # All styles
└── main.jsx                # Entry point with router
```

---

## 🔒 Privacy

ByteFeed does not collect any personal data. All preferences (bookmarks, theme, read later) are stored in your browser's local storage only and never leave your device.

Read the full [Privacy Policy](https://bytefeed.store/privacy).

---

## 📬 Contact

For any questions, content removal requests, or feedback:

**Email:** faizankhan901152@gmail.com

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<p align="center">Made with ♥ by <strong>Faizan Khan</strong></p>
