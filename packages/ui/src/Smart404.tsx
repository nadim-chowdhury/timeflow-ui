"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const suggestBasedOnPath = (path: string) => {
  const cleaned = path.toLowerCase().replaceAll("/", " ").trim();

  if (cleaned.includes("price") || cleaned.includes("plans"))
    return "Looking for our pricing?";
  if (cleaned.includes("docs") || cleaned.includes("api"))
    return "Need docs or API references?";
  if (cleaned.includes("login")) return "Trying to log in?";
  if (cleaned.includes("dark-mode")) return "Want to see the dark side?";
  return "Not quite what you were looking for, huh?";
};

const Smart404 = () => {
  const [path, setPath] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fullPath = window.location.pathname;
    setPath(fullPath);
    setSuggestion(suggestBasedOnPath(fullPath));
  }, []);

  const relatedLinks = [
    { label: "🏠 Go to Home", href: "/" },
    { label: "📄 Docs", href: "/docs" },
    { label: "💳 Pricing", href: "/pricing" },
    { label: "🧠 Components", href: "/components" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 max-w-xl w-full space-y-6 text-center">
        <h1 className="text-5xl font-black text-red-500 dark:text-red-400">
          404
        </h1>
        <p className="text-lg text-gray-800 dark:text-gray-200">
          Page not found at{" "}
          <code className="bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded">
            {path}
          </code>
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">{suggestion}</p>

        <div className="pt-4 grid gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 px-4 py-2 rounded transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 italic">
          You didn’t fail — the internet just blinked. ✨
        </div>
      </div>
    </main>
  );
};

export default Smart404;

// Send the path to GPT:
// "The user visited /dark-mode-admin. Suggest 2 relevant pages."

// const prompt = `User tried to visit "${path}". What were they likely looking for on a developer tools site? Respond in a fun, friendly tone and offer 2 related links.`;

// const response = await openai.createChatCompletion({
//   model: "gpt-4",
//   messages: [{ role: "user", content: prompt }],
// });