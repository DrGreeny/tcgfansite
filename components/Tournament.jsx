import dynamic from "next/dynamic";
import React from "react";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  import("@g-loot/react-tournament-brackets");
}
const SingleEliminationBracket = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.SingleEliminationBracket
    );
  },
  { ssr: false }
);

const Match = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then((mod) => mod.Match);
  },
  { ssr: false }
);
const MATCH_STATES = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.MATCH_STATES
    );
  },
  { ssr: false }
);
const SVGViewer = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.SVGViewer
    );
  },
  { ssr: false }
);

const createTheme = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.createTheme
    );
  },
  { ssr: false }
);
