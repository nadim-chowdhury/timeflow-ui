"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const LAST_VISIT_KEY = "lastVisitData";

interface VisitData {
  timestamp: number;
  section: string;
}

export const LastVisitMemory = ({
  currentSection,
}: {
  currentSection: string;
}) => {
  const [lastVisit, setLastVisit] = useState<VisitData | null>(null);

  useEffect(() => {
    // Load last visit
    const stored = localStorage.getItem(LAST_VISIT_KEY);
    if (stored) {
      const parsed: VisitData = JSON.parse(stored);
      setLastVisit(parsed);
    }

    // Save current session on unload
    const handleUnload = () => {
      const newData: VisitData = {
        timestamp: Date.now(),
        section: currentSection,
      };
      localStorage.setItem(LAST_VISIT_KEY, JSON.stringify(newData));
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [currentSection]);

  if (!lastVisit) return null;

  const timeAgo = formatDistanceToNow(lastVisit.timestamp, { addSuffix: true });

  return (
    <div className="fixed top-4 right-4 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4 max-w-xs z-50">
      <p className="text-sm font-medium text-gray-800">👋 Welcome back!</p>
      <p className="text-xs text-gray-600 mt-1">
        Last time you were checking <strong>{lastVisit.section}</strong>
        <br />
        {timeAgo}
      </p>
    </div>
  );
};
