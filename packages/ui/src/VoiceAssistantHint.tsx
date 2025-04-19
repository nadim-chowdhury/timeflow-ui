"use client";

import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const VoiceAssistantHint = () => {
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check mic permissions on mount
    navigator.permissions
      ?.query({ name: "microphone" as PermissionName })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          setHasMicPermission(true);
          setVisible(true);

          // Auto-hide after 10 seconds
          setTimeout(() => setVisible(false), 10000);
        }
      });
  }, []);

  return (
    <AnimatePresence>
      {hasMicPermission && visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl px-4 py-2 rounded-full text-sm text-gray-800 dark:text-gray-200"
        >
          <Mic className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span className="text-sm">
            Try saying:{" "}
            <span className="font-medium">“Show today’s stats”</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
