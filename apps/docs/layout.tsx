"use client";

import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 px-3 py-1 rounded bg-gray-800 text-white dark:bg-white dark:text-black"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
