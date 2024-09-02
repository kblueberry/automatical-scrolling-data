import { useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import { useFetch } from "../../hooks/useFetch";
import { useScrollToggle } from "../../hooks/useScrollToggle";
import "./List.css";

export default function List() {
  const { logsState } = useFetch();
  const { isAutomaticScroll, toggleScroll, action } = useScrollToggle();
  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    if (logsState.isConnected && isAutomaticScroll && listRef.current) {
      listRef.current.scrollToItem(logsState.logs.length - 1);
    }
  }, [logsState, isAutomaticScroll]);

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
    <>
      <FixedSizeList
        ref={listRef}
        height={820}
        itemCount={logsState.logs.length}
        itemSize={40}
        width="100%"
      >
        {ListItem}
      </FixedSizeList>
      <button
        className="toggle"
        style={{ backgroundColor: `${isAutomaticScroll ? "green" : "red"}` }}
        onClick={toggleScroll}
      >
        {action}
      </button>
    </>
  ) : (
    <p>Unable to connect to Web Socket</p>
  );
}
