import React, { useState, useEffect } from "react";

import DeckBuilder from "../components/DeckBuilder";
import Deckbuilder_mobile from "../components/deckbuilder_mobile/Deckbuilder_mobile";

export default function Deckbuilder() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false); // Track the readiness of the component

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsReady(true); // Set the component as ready after detecting the window width
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isReady) {
    return null; // Return null or a loading indicator while the component is not ready
  }

  if (isMobile) {
    return <Deckbuilder_mobile />;
  }

  return <DeckBuilder />;
}
