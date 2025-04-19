"use client";

import { useState, useRef } from "react";
import { useTime } from "./TimeProvider";
import { Upload, Sparkles, ImagePlus, Loader2 } from "lucide-react";

export const AIImageEnhancer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { period } = useTime();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enhanced, setEnhanced] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const enhanceImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai-image-enhancer", {
        method: "POST",
        body: JSON.stringify({ image, mood: period }),
      });
      const data = await res.json();
      setEnhanced(data.output); // return base64 or URL
    } catch (err) {
      alert("Enhancement failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 p-6 border rounded-xl bg-white dark:bg-zinc-900 shadow">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <ImagePlus size={20} /> AI Image Enhancer
      </h2>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <Upload size={16} /> Upload Image
      </button>

      {image && (
        <img
          src={image}
          alt="Uploaded"
          className="w-full rounded-lg border border-gray-200 dark:border-zinc-700"
        />
      )}

      {image && (
        <button
          onClick={enhanceImage}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Sparkles size={16} />
          )}
          Enhance Image (mode: {period})
        </button>
      )}

      {enhanced && (
        <div>
          <h4 className="mt-4 mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Enhanced Image:
          </h4>
          <img
            src={enhanced}
            alt="Enhanced"
            className="w-full rounded-lg border border-green-300"
          />
        </div>
      )}
    </div>
  );
};

// pages/api/ai-image-enhancer.ts

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { image, mood } = await req.json();

//   // Replace this stub with actual AI processing
//   // For demo, return the same image back
//   return NextResponse.json({
//     output: image, // In reality, call enhancement API and return new base64 or URL
//   });
// }
