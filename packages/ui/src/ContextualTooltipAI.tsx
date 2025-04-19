"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";

type Props = {
  targetText: string; // visible text or label
  context: string; // data type, role, or metadata
  mode?: "hover" | "click"; // trigger mode
};

export const ContextualTooltipAI = ({
  targetText,
  context,
  mode = "hover",
}: Props) => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const getTooltip = async () => {
    if (tooltip) return; // cached

    const res = await fetch("/api/contextual-tooltip", {
      method: "POST",
      body: JSON.stringify({ context }),
    });
    const data = await res.json();
    setTooltip(data.tooltip || "No info available.");
  };

  const handleTrigger = () => {
    getTooltip();
    setShow(true);
  };

  const handleLeave = () => {
    if (mode === "hover") setShow(false);
  };

  return (
    <div
      className="relative inline-flex items-center gap-1 cursor-help"
      onMouseEnter={mode === "hover" ? handleTrigger : undefined}
      onFocus={handleTrigger}
      onMouseLeave={handleLeave}
    >
      <span>{targetText}</span>
      <Info
        size={14}
        className="text-blue-500"
        onClick={mode === "click" ? () => setShow(!show) : undefined}
      />

      {show && tooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-black text-white text-xs px-3 py-2 rounded shadow-lg max-w-xs whitespace-pre-line">
          {tooltip}
        </div>
      )}
    </div>
  );
};

// pages/api/contextual-tooltip.ts

// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "edge";

// export async function POST(req: NextRequest) {
//   const { context } = await req.json();

//   const prompt = `Explain briefly for a tooltip: "${context}". 
// Keep it concise, helpful, and beginner-friendly.`;

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.5,
//     }),
//   });

//   const json = await res.json();
//   const tooltip = json.choices?.[0]?.message?.content?.trim();
//   return NextResponse.json({ tooltip });
// }
