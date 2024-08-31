import { useState } from "react";

export function useScrollToggle() {
  const [isAutomaticScroll, setIsAutomaticScroll] = useState<boolean>(false);
  const [action, setAction] = useState<string>("Scroll automatically");

  const toggleScroll = (): void => {
    setIsAutomaticScroll(!isAutomaticScroll);
    setAction(() =>
      isAutomaticScroll ? "Scroll automatically" : "Scroll manually"
    );
  };

  return { isAutomaticScroll, action, toggleScroll };
}
