import {
  ConnectionStatusProvider,
  useConnection,
} from "./ConnectionStatusProvider";
import { DeviceProvider, useDevice } from "./DeviceProvider";
import { TimeProvider, useTime } from "./TimeProvider";

function InfoPanel() {
  const { os, isMobile } = useDevice();
  const { period, timezone } = useTime();
  const { isOnline, connectionType } = useConnection();

  return (
    <div className="p-4 space-y-2 bg-gray-100 dark:bg-zinc-800 rounded-xl">
      <p>
        🖥 OS: {os} | Mobile: {isMobile ? "Yes" : "No"}
      </p>
      <p>
        ⏰ Time Period: {period} | Timezone: {timezone}
      </p>
      <p>
        🌐 Online: {isOnline ? "Yes" : "No"} | Connection: {connectionType}
      </p>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <DeviceProvider>
      <TimeProvider>
        <ConnectionStatusProvider>
          <InfoPanel />
        </ConnectionStatusProvider>
      </TimeProvider>
    </DeviceProvider>
  );
}
