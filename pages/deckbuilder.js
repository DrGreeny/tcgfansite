import React, { useState, useEffect } from "react";

import DeckBuilder from "../components/DeckBuilder";
import Deckbuilder_mobile from "../components/deckbuilder_mobile/Deckbuilder_mobile";

export default function Deckbuilder() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <Deckbuilder_mobile />;
  }

  return <DeckBuilder />;
}
