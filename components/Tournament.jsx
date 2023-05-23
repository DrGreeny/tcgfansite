import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  MATCH_STATES,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

export const DoubleElimination = () => (
  <DoubleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);
export const SingleElimination = () => (
  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);
