import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(28);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);

      const footer = document.querySelector(".footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const btnHeight = 44 + 28; // button height + default gap

        if (footerTop < windowHeight) {
          // footer is visible — push button up above it
          setBottomOffset(windowHeight - footerTop + 12);
        } else {
          setBottomOffset(28);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      title="Back to top (T)"
      style={{ bottom: bottomOffset }}
    >
      ↑
    </button>
  );
}
