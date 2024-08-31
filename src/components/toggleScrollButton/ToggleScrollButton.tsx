import { useScrollToggle } from "../../hooks/useScrollToggle";
import "./ToggleScrollButton.css";

export default function ToggleScrollButton() {
  const { isAutomaticScroll, action, toggleScroll } = useScrollToggle();

  return (
    <button
      className="toggle"
      style={{ backgroundColor: `${isAutomaticScroll ? "green" : "red"}` }}
      onClick={toggleScroll}
    >
      {action}
    </button>
  );
}
