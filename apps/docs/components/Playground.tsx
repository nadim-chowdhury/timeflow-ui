"use client";

import { useState } from "react";
import type { FC } from "react";

interface PlaygroundProps {
  Component: FC<{ simulatedHour: number }>;
}

export const Playground: FC<PlaygroundProps> = ({ Component }) => {
  const [hour, setHour] = useState(new Date().getHours());

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">
      <div>
        <label className="font-medium">Simulate Hour:</label>
        <input
          type="range"
          min="0"
          max="23"
          value={hour}
          onChange={(e) => setHour(parseInt(e.target.value))}
        />
        <span className="ml-2">{hour}:00</span>
      </div>
      <div className="border p-4 rounded">
        <Component simulatedHour={hour} />
      </div>
    </div>
  );
};
