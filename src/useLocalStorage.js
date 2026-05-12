import { useState } from "react";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  function set(val) {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }

  return [value, set];
}
