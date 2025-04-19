"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type DeviceContextType = {
  isMobile: boolean;
  isTouch: boolean;
  os: "iOS" | "Android" | "Windows" | "macOS" | "Linux" | "Unknown";
};

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevice = () => {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevice must be used within DeviceProvider");
  return ctx;
};

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DeviceContextType>({
    isMobile: false,
    isTouch: false,
    os: "Unknown",
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    const isTouch = "ontouchstart" in window;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

    let os: DeviceContextType["os"] = "Unknown";
    if (/Windows NT/.test(ua)) os = "Windows";
    else if (/Mac OS/.test(ua)) os = "macOS";
    else if (/Android/.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
    else if (/Linux/.test(ua)) os = "Linux";

    setState({ isMobile, isTouch, os });
  }, []);

  return (
    <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>
  );
};
