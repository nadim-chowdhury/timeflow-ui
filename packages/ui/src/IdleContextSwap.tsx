"use client";

import { useEffect, useState, createContext, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IdleContext = createContext({ isIdle: false });
export const useIdleStatus = () => useContext(IdleContext);

export const IdleContextSwap = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeout = 60_000; // 1 minute of inactivity
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    setIsIdle(false);
    idleTimerRef.current = setTimeout(() => setIsIdle(true), idleTimeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "touchstart", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    idleTimerRef.current = setTimeout(() => setIsIdle(true), idleTimeout);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
    };
  }, []);

  return (
    <IdleContext.Provider value={{ isIdle }}>
      <div className="relative">
        {children}

        <AnimatePresence>
          {isIdle && (
            <motion.div
              key="calm-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-40 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-700 dark:text-gray-300">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl font-medium"
                >
                  You&apos;re in calm mode 🌙
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 text-sm"
                >
                  Move your mouse or tap to return
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </IdleContext.Provider>
  );
};
