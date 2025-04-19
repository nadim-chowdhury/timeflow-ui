"use client";

// import { ReactNode } from "react";

// interface ButtonProps {
//   children: ReactNode;
//   className?: string;
//   appName: string;
// }

export type ButtonProps = {
  appName?: string;
  variant?: "default" | "outline" | "ghost" | "link"; // Add as needed
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
