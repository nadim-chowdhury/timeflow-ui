"use client";

import { useEffect, useState } from "react";
import { useTime } from "./TimeProvider";

type Theme = "light" | "dark" | "warm" | "cool" | "system";

export const SmartThemeSwitcher = () => {
  const { period } = useTime();
  const [theme, setTheme] = useState<Theme>("system");

  // Load theme preference
  useEffect(() => {
    const saved = localStorage.getItem("preferred-theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  // Handle ambient light sensor
  useEffect(() => {
    let sensor: any;

    const setupSensor = async () => {
      if ("AmbientLightSensor" in window) {
        try {
          sensor = new (window as any).AmbientLightSensor();
          sensor.addEventListener("reading", () => {
            const illuminance = sensor.illuminance;
            const preferred: Theme = illuminance < 30 ? "dark" : "light";
            setTheme(preferred);
            localStorage.setItem("preferred-theme", preferred);
          });
          sensor.start();
        } catch (err) {
          console.warn("AmbientLightSensor error:", err);
        }
      }
    };

    setupSensor();

    return () => {
      sensor?.stop?.();
    };
  }, []);

  // Time of day fallback if theme is "system"
  useEffect(() => {
    if (theme === "system") {
      if (["evening", "night"].includes(period)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, period]);

  // Apply specific theme classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "warm", "cool");

    if (theme !== "system") {
      root.classList.add(theme);
    } else {
      // Let system/time fallback decide "dark" class
      if (["evening", "night"].includes(period)) {
        root.classList.add("dark");
      }
    }
  }, [theme, period]);

  const handleChange = (val: Theme) => {
    setTheme(val);
    localStorage.setItem("preferred-theme", val);
  };

  return (
    <div className="flex gap-2 items-center p-2 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-inner">
      <span className="text-zinc-600 dark:text-zinc-300">Theme:</span>
      {["light", "dark", "warm", "cool", "system"].map((t) => (
        <button
          key={t}
          onClick={() => handleChange(t as Theme)}
          className={`px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ${
            theme === t ? "font-bold underline" : ""
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};
