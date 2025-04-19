"use client";

import { JSX, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
//   MonitorSmartphone,
  Smartphone,
  TabletSmartphone,
  Monitor,
} from "lucide-react";

type DeviceType = "mobile" | "tablet" | "desktop";
type OS = "Windows" | "macOS" | "iOS" | "Android" | "Linux" | "Unknown";

function getDeviceType(): DeviceType {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

function getOS(): OS {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent;

  if (/Win/i.test(platform)) return "Windows";
  if (/Mac/i.test(platform))
    return /iPhone|iPad|iPod/.test(userAgent) ? "iOS" : "macOS";
  if (/Linux/.test(platform))
    return /Android/.test(userAgent) ? "Android" : "Linux";
  return "Unknown";
}

const messages: Record<DeviceType, string> = {
  mobile: "You're on mobile — tap gestures enabled.",
  tablet: "Tablet detected — adaptive layout engaged.",
  desktop: "You're on desktop — full keyboard shortcuts available.",
};

const icons: Record<DeviceType, JSX.Element> = {
  mobile: <Smartphone className="h-4 w-4 text-indigo-500" />,
  tablet: <TabletSmartphone className="h-4 w-4 text-indigo-500" />,
  desktop: <Monitor className="h-4 w-4 text-indigo-500" />,
};

export const ActiveDeviceBanner = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [os, setOS] = useState<OS>("Unknown");

  useEffect(() => {
    setDeviceType(getDeviceType());
    setOS(getOS());
  }, []);

  if (!deviceType) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200"
    >
      {icons[deviceType]}
      <span>{messages[deviceType]}</span>
      <span className="text-xs text-gray-500 ml-2">({os})</span>
    </motion.div>
  );
};
