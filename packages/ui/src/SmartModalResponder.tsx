"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

type ModalType = "idle" | "focusTooLong" | "comparePlans" | null;

export const SmartModalResponder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Simulate current route for contextual modals
  const simulatedRoute = "/pricing"; // you could replace with usePathname() from next/navigation

  // Detect idle
  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("keydown", handleActivity);

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 1000 * 30 && !isOpen) {
        setModalType("idle");
        setIsOpen(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearInterval(interval);
    };
  }, [lastActivity, isOpen]);

  // Simulate focus on pricing page for too long
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (simulatedRoute === "/pricing") {
      timer = setTimeout(() => {
        if (!isOpen) {
          setModalType("comparePlans");
          setIsOpen(true);
        }
      }, 20000); // show after 20 seconds on pricing
    }
    return () => clearTimeout(timer);
  }, [simulatedRoute, isOpen]);

  const getModalMessage = () => {
    switch (modalType) {
      case "idle":
        return "You've been idle for a bit. Need help finding something?";
      case "comparePlans":
        return "Looks like you're checking out our plans — want a quick breakdown?";
      case "focusTooLong":
        return "Noticed you've been focused for a while. Can I assist you?";
      default:
        return "Need a hand?";
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-zinc-800 rounded-xl p-6 max-w-md w-full shadow-xl">
          <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
            🤖 Smart Assistant
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {getModalMessage()}
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded dark:bg-zinc-700 dark:hover:bg-zinc-600"
              onClick={() => setIsOpen(false)}
            >
              No thanks
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                setIsOpen(false);
                // Add your help route/action here
              }}
            >
              Show me help
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
