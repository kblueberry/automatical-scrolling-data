import { useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import { useFetch } from "../../hooks/useFetch";
import "./List.css";

export default function List() {
  const { logsState } = useFetch();
  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    if (logsState.isConnected && listRef.current) {
      listRef.current.scrollToItem(logsState.logs.length - 1);
    }
  }, [logsState]);

  const ListItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    return (
      <li key={logsState.logs[index].id} {...{ style }}>
        {logsState.logs[index].message}
      </li>
    );
  };

  return logsState.isConnected ? (
    <FixedSizeList
      ref={listRef}
      height={820}
      itemCount={logsState.logs.length}
      itemSize={40}
      width="100%"
    >
      {ListItem}
    </FixedSizeList>
  ) : (
    <p>Unable to connect to Web Socket</p>
  );
}
