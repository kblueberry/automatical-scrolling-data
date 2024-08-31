import { Log, useFetch } from "../../hooks/useFetch";
import "./List.css";

export default function List() {
  const { logsState } = useFetch();

  return logsState.isConnected ? (
    <ul className="list">
      {logsState.logs.map((log: Log) => (
        <li key={log.id} className="list_item">
          {log.message}
        </li>
      ))}
    </ul>
  ) : (
    <p>Unable to connect to Web Scoket</p>
  );
}
