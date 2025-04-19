"use client";

import { useEffect, useState } from "react";

type Step = {
  id: string;
  label: string;
  content: string;
  shouldSkip?: boolean;
};

export const AIAssistedOnboarding = ({ userEmail = "dev@company.com" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [interactionSpeed, setInteractionSpeed] = useState<number>(0);
  const [scrollDepth, setScrollDepth] = useState<number>(0);
  const [role, setRole] = useState<"dev" | "manager" | "designer" | "guest">(
    "guest"
  );

  const onboardingSteps: Step[] = [
    {
      id: "intro",
      label: "Welcome",
      content: "Welcome to TimeFlow UI! Let’s set things up just right.",
    },
    {
      id: "code-setup",
      label: "Setup Your Environment",
      content: "Install the package and get Tailwind + Next.js running.",
      shouldSkip: role === "designer",
    },
    {
      id: "theme-guide",
      label: "Pick a Theme",
      content: "Choose a dark/light/auto theme for your UI preview.",
    },
    {
      id: "api-connect",
      label: "Connect APIs",
      content: "Let’s hook into weather, time, and location APIs.",
      shouldSkip: interactionSpeed > 3 && scrollDepth > 70,
    },
    {
      id: "done",
      label: "You’re Ready!",
      content: "That’s it — enjoy the adaptive experience!",
    },
  ];

  const visibleSteps = onboardingSteps.filter((step) => !step.shouldSkip);

  // Simulate role detection from email domain
  useEffect(() => {
    if (userEmail.includes("design")) setRole("designer");
    else if (userEmail.includes("manager")) setRole("manager");
    else if (userEmail.includes("dev") || userEmail.includes("engineer"))
      setRole("dev");
    else setRole("guest");
  }, [userEmail]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const depth = Math.round((scrollTop / docHeight) * 100);
      setScrollDepth(depth);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure interaction speed (clicks per minute)
  useEffect(() => {
    let clicks = 0;
    const clickHandler = () => clicks++;
    window.addEventListener("click", clickHandler);

    const interval = setInterval(() => {
      setInteractionSpeed(clicks);
      clicks = 0;
    }, 60000); // every minute

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, visibleSteps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const step = visibleSteps[currentStep];

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 space-y-4">
      <div className="text-xs uppercase tracking-wide text-blue-500 font-semibold">
        Step {currentStep + 1} of {visibleSteps.length}
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {/* {step.label} */}
      </h2>
      {/* <p className="text-gray-600 dark:text-gray-300">{step.content}</p> */}

      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-sm hover:bg-gray-300 disabled:opacity-30"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === visibleSteps.length - 1}
          className="px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-30"
        >
          {currentStep === visibleSteps.length - 2 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
