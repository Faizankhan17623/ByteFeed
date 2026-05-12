const KEY_STREAK = "bytefeed_streak";
const KEY_LAST = "bytefeed_streak_last";

export function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem(KEY_LAST);
  let streak = parseInt(localStorage.getItem(KEY_STREAK) || "0");

  if (last === today) return streak; // already visited today

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (last === yesterday) {
    streak += 1;
  } else {
    streak = 1; // reset streak
  }

  localStorage.setItem(KEY_STREAK, streak);
  localStorage.setItem(KEY_LAST, today);
  return streak;
}

export function getStreak() {
  return parseInt(localStorage.getItem(KEY_STREAK) || "0");
}
