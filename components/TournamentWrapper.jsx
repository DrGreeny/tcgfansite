import dynamic from "next/dynamic";
import matches from "/db/matches.js";
import { useState, useEffect } from "react";

const SingleEliminationBracket = dynamic(
  () =>
    import("@g-loot/react-tournament-brackets").then(
      (mod) => mod.SingleEliminationBracket
    ),
  { ssr: false }
);

const Match = dynamic(
  () => import("@g-loot/react-tournament-brackets").then((mod) => mod.Match),
  { ssr: false }
);

const SVGViewer = dynamic(
  () =>
    import("@g-loot/react-tournament-brackets").then((mod) => mod.SVGViewer),
  { ssr: false }
);

const TournamentWrapper = () => {
  const getWindowSize = () => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight,
      };
    }
    return { width: 0, height: 0 };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const finalWidth = Math.max(windowSize.width - 50, 500);
  const finalHeight = Math.max(windowSize.height - 100, 500);

  return (
    <div className="bg-black">
      <h1>Tournament Bracket</h1>
      <SingleEliminationBracket
        matches={matches} // Remove the extra curly braces
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <SVGViewer width={finalWidth} height={finalHeight} {...props}>
            {children}
          </SVGViewer>
        )}
      />
    </div>
  );
};

export default TournamentWrapper;
