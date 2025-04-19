"use client";

import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  job: string;
  reason: string;
};

export const FormFillerAI = () => {
  const [form, setForm] = useState<FormValues>({
    name: "",
    email: "",
    job: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof FormValues, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const fillWithAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/form-filler-ai", {
        method: "POST",
      });
      const data = await res.json();
      setForm(data);
    } catch {
      alert("AI suggestion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl border dark:border-zinc-700 shadow space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles size={20} /> Smart Contact Form
        </h2>
        <button
          onClick={fillWithAI}
          className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 flex items-center gap-1"
          disabled={loading}
        >
          <Wand2 size={16} /> {loading ? "Filling..." : "Let AI fill this"}
        </button>
      </div>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600"
      />
      <input
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600"
      />
      <input
        placeholder="Job Title"
        value={form.job}
        onChange={(e) => handleChange("job", e.target.value)}
        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600"
      />
      <textarea
        placeholder="Reason for contact"
        value={form.reason}
        onChange={(e) => handleChange("reason", e.target.value)}
        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600"
        rows={4}
      />
    </div>
  );
};

// pages/api/form-filler-ai.ts

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const prompt = `Generate realistic, friendly form values for a contact form with:
// - Name
// - Email
// - Job Title
// - Reason for contacting a software company`;

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     }),
//   });

//   const json = await res.json();
//   const content = json.choices?.[0]?.message?.content || "";

//   const match = content.match(
//     /Name:\s*(.+)\nEmail:\s*(.+)\nJob Title:\s*(.+)\nReason:\s*([\s\S]*)/
//   );

//   return NextResponse.json({
//     name: match?.[1]?.trim() || "Alex Johnson",
//     email: match?.[2]?.trim() || "alex@example.com",
//     job: match?.[3]?.trim() || "Marketing Manager",
//     reason:
//       match?.[4]?.trim() ||
//       "I'm interested in learning more about your platform and possible collaboration.",
//   });
// }
