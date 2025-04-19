"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";
// import clsx from "clsx";

interface Props {
  milestones?: string[];
  motivate?: boolean;
}

export const ScrollProgressTracker = ({
  milestones = [],
  motivate = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const [motivation, setMotivation] = useState("");

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      if (!motivate) return;

      const pct = v * 100;
      if (pct < 10) setMotivation("Let's get started 🚀");
      else if (pct < 30) setMotivation("Keep going 🔥");
      else if (pct < 50) setMotivation("You're doing great ✨");
      else if (pct < 70) setMotivation("Halfway there 💪");
      else if (pct < 90) setMotivation("Almost done 👀");
      else setMotivation("You made it! 🎉");
    });

    return () => unsubscribe();
  }, [progress, motivate]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-2 bg-indigo-500 z-50 w-full origin-left"
        style={{ scaleX: progress }}
      />

      {milestones.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full shadow-md">
          {milestones.map((milestone, index) => (
            <span key={index} className="whitespace-nowrap">
              {milestone}
            </span>
          ))}
        </div>
      )}

      {motivate && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-40 text-sm font-semibold text-indigo-600 dark:text-indigo-300 transition-all">
          {motivation}
        </div>
      )}
    </>
  );
};
