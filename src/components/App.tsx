import { useFetch } from "../hooks/useFetch";
import List from "./list/List";

export default function App() {
  const { logsState } = useFetch();

  return logsState.isConnected ? (
    <List {...{ logsState }} listSize={logsState.logs.length} />
  ) : (
    <p>Unable to connect to Web Socket</p>
  );
}
