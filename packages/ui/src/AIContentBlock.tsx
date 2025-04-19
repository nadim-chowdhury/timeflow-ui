"use client";

import { useEffect, useState } from "react";

type BlockType = "hero" | "cta" | "testimonial" | "feature" | "footer";

const placeholderContent: Record<
  BlockType,
  { title: string; tip: string; image?: string }
> = {
  hero: {
    title: "Your product headline goes here",
    tip: "Try: 'Save time with AI.'",
    image: "https://source.unsplash.com/featured/?technology,ai",
  },
  cta: {
    title: "Ready to get started?",
    tip: "Try: 'Sign up in 60 seconds — no credit card needed.'",
  },
  testimonial: {
    title: "“This product changed how I work.”",
    tip: "Use a real customer quote with a name + photo.",
    image: "https://source.unsplash.com/64x64/?face,person",
  },
  feature: {
    title: "Smart features for modern teams",
    tip: "Highlight benefits: speed, ease, automation.",
  },
  footer: {
    title: "Thanks for visiting ✌️",
    tip: "Add quick links + contact email or socials.",
  },
};

export const AIContentBlock = ({ type = "hero" }: { type?: BlockType }) => {
  const [content, setContent] = useState(placeholderContent[type]);

  useEffect(() => {
    setContent(placeholderContent[type]);
  }, [type]);

  return (
    <div className="rounded-lg border border-dashed border-gray-300 dark:border-zinc-600 p-6 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md shadow-inner max-w-xl mx-auto space-y-4">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {content.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 italic">
        {content.tip}
      </p>
      {content.image && (
        <img
          src={content.image}
          alt="Placeholder"
          className="rounded-lg mt-4 object-cover max-h-40 w-full"
        />
      )}
    </div>
  );
};
