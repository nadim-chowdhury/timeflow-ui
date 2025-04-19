"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Extend Navigator with correct NetworkInformation reference
declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }

  interface NetworkInformation extends EventTarget {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  }
}

type ConnectionContextType = {
  isOnline: boolean;
  connectionType: string;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

export const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnection must be used within a ConnectionStatusProvider"
    );
  }
  return context;
};

export const ConnectionStatusProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const getConnectionType = (): string =>
    navigator.connection?.effectiveType ?? "unknown";

  const [status, setStatus] = useState<ConnectionContextType>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    connectionType:
      typeof navigator !== "undefined" ? getConnectionType() : "unknown",
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus({
        isOnline: navigator.onLine,
        connectionType: getConnectionType(),
      });
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    navigator.connection?.addEventListener("change", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      navigator.connection?.removeEventListener("change", updateStatus);
    };
  }, []);

  return (
    <ConnectionContext.Provider value={status}>
      {children}
    </ConnectionContext.Provider>
  );
};
