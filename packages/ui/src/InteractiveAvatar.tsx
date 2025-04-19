"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const getTimeMood = () => {
  const hour = new Date().getHours();
  if (hour < 6 || hour >= 22) return "sleepy";
  if (hour < 12) return "morning";
  if (hour < 18) return "day";
  return "evening";
};

export const InteractiveAvatar = () => {
  const [mood, setMood] = useState(getTimeMood());
  const [isDizzy, setIsDizzy] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      const current = window.scrollY;
      const speed = Math.abs(current - lastScroll);
      lastScroll = current;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsDizzy(speed > 50); // adjust threshold
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    const interval = setInterval(() => {
      setMood(getTimeMood());
    }, 60 * 1000); // update mood hourly

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => setClicks((c) => c + 1);

  const moodToImage = () => {
    if (isDizzy) return "/avatar-dizzy.png";
    if (clicks % 5 === 4) return "/avatar-wave.png";
    switch (mood) {
      case "morning":
        return "/avatar-happy.png";
      case "day":
        return "/avatar-neutral.png";
      case "evening":
        return "/avatar-relaxed.png";
      case "sleepy":
        return "/avatar-sleepy.png";
      default:
        return "/avatar-neutral.png";
    }
  };

  return (
    <motion.div
      className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md cursor-pointer"
      onClick={handleClick}
      animate={{
        rotate: isDizzy ? [0, 15, -15, 15, -15, 0] : 0,
        transition: { duration: 0.6 },
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={moodToImage()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            src={moodToImage()}
            alt="Avatar"
            width={80}
            height={80}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
