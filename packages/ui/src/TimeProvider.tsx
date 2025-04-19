"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type TimeContextType = {
  hour: number;
  period: "morning" | "afternoon" | "evening" | "night";
  timezone: string;
};

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const useTime = () => {
  const ctx = useContext(TimeContext);
  if (!ctx) throw new Error("useTime must be used within TimeProvider");
  return ctx;
};

function getPeriod(hour: number): TimeContextType["period"] {
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState<TimeContextType>({
    hour: new Date().getHours(),
    period: getPeriod(new Date().getHours()),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hour: now.getHours(),
        period: getPeriod(now.getHours()),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }, 60_000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};
