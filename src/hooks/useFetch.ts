import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Log = {
  id: string;
  message: string;
};

export type LogsState = {
  isConnected: boolean;
  logs: Array<Log>;
  error?: Event | null;
};

const logsLoadingState: LogsState = {
  isConnected: false,
  logs: [],
};

export function useFetch() {
  const [logsState, setLogsState] = useState<LogsState>(logsLoadingState);
  const [client, setClient] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!client) {
      const ws = new WebSocket(
        "wss://test-log-viewer-backend.stg.onepunch.agency/view-log-ws"
      );

      ws.onopen = () => {
        ws.send("message");
        setLogsState((prev: LogsState) => {
          return { ...prev, isConnected: true };
        });
      };
      setClient(ws);

      ws.onmessage = (event: MessageEvent) => {
        setLogsState((prev: LogsState) => {
          return {
            ...prev,
            logs: [...prev.logs, { id: uuidv4(), message: event.data }],
          };
        });
      };

      ws.onclose = () => {
        setLogsState((prev: LogsState) => {
          return { ...prev, isConnected: false };
        });
      };

      ws.onerror = (error: Event) => {
        setLogsState((prev: LogsState) => {
          return { ...prev, error };
        });
      };
    }
  }, [client]);

  return { logsState };
}
