"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export const AutoSummarizerCard = ({ content }: { content: string }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auto-summarizer", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setSummary(data.summary || "Could not generate summary.");
    } catch {
      setSummary("⚠️ Network error or API limit reached.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border dark:border-zinc-700 rounded-xl p-4 bg-white dark:bg-zinc-900 shadow space-y-3 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles size={18} /> AI Summary
        </h3>
        {summary && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 hover:underline flex items-center"
          >
            {expanded ? "Hide Full" : "Show Full"}{" "}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {summary ? (
        <div className="text-sm text-gray-800 dark:text-gray-200 space-y-2">
          {expanded
            ? summary
            : summary.slice(0, 200) + (summary.length > 200 ? "..." : "")}
        </div>
      ) : (
        <button
          onClick={summarize}
          disabled={loading}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </button>
      )}
    </div>
  );
};

// pages/api/auto-summarizer.ts

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { content } = await req.json();

//   const prompt = `
// Please summarize the following content into:
// - A short TL;DR
// - 2–3 key highlights
// - 1 action item or takeaway

// Content:
// """${content}"""
// `;

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       temperature: 0.6,
//       messages: [{ role: "user", content: prompt }],
//     }),
//   });

//   const json = await res.json();
//   const summary = json.choices?.[0]?.message?.content;
//   return NextResponse.json({ summary });
// }
