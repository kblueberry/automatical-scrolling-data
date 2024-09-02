import { useState } from "react";

export function useScrollToggle() {
  const [isAutomaticScroll, setIsAutomaticScroll] = useState<boolean>(true);
  const [action, setAction] = useState<string>("Scroll manually");

  const toggleScroll = (): void => {
    setIsAutomaticScroll(!isAutomaticScroll);
    setAction(() =>
      isAutomaticScroll ? "Scroll manually" : "Scroll automatically"
    );
  };

  return { isAutomaticScroll, action, toggleScroll };
}
