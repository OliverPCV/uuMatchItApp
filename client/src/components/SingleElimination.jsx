import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme
} from "@g-loot/react-tournament-brackets";


const GlootTheme = createTheme({
  textColor: {
    main: "#000000", // Tmavě zelená
    highlighted: "#000000", // Světle zelená
    dark: "#000000" // Velmi tmavě zelená
  },
  matchBackground: {
    lostColor: "#ffffff", // pozadí jednotlivýho boxu
    wonColor: "#ffffff" // pozadí jednotlivýho boxu
  },
  score: {
    background: {
      wonColor: "#85d285", // tým co vyhrál pozadí, boxu WON
      lostColor: "#c3c2c2" // tým co nevyhrál pozadí, boxu LOST
    },
    text: {
      highlightedWonColor: "#000000", // barva WON
      highlightedLostColor: "#000000" // barva LOST
    }
  },
  border: {
    color: "#7ad47a",
    highlightedColor: "#843535"
  },
  roundHeader: {
    backgroundColor: "#004d00",
    fontColor: "#ffffff"
  },

  connectorColor: "#080808",
  connectorColorHighlight: "#843535",
});

const SingleElimination = ({ tournamentData }) => {
/*
  console.log(tournamentData);
  const fillTeamsInMatches = (tournamentData, bracket) => {
    const firstRoundMatches = bracket.filter(match => match.tournamentRoundText === "1");
    firstRoundMatches.forEach((match, index) => {
      // Vypočítáme indexy pro týmy (0 & 1 pro první zápas, 2 & 3 pro druhý, atd.)
      const firstTeamIndex = index * 2;
      const secondTeamIndex = firstTeamIndex + 1;

      // Přiřadíme týmy k účastníkům
      match.participants[0] = tournamentData.teams[firstTeamIndex]
        ? {
          ...tournamentData.teams[firstTeamIndex], // Spread operator převezme všechny vlastnosti týmu
          isWinner: false, // Toto by mělo být nastaveno podle výsledků, pokud jsou dostupné
          status: null, // Toto by mělo být nastaveno podle stavu zápasu
        }
        : { name: "TBD" }; // Pokud tým není definován, nastavíme jako "To Be Decided"


      match.participants[1] = tournamentData.teams[secondTeamIndex]
        ? {
          ...tournamentData.teams[secondTeamIndex], // Stejně jako u prvního týmu
          isWinner: false, // Toto by mělo být nastaveno podle výsledků, pokud jsou dostupné
          status: null, // Toto by mělo být nastaveno podle stavu zápasu
        }
        : { name: "TBD" }; // Pokud tým není definován, nastavíme jako "To Be Decided"
    });

    return bracket;
  };

  // Pak můžete tuto funkci zavolat a předat ji vaše data týmů a bracket
  // Předpokládá se, že 'tournamentData' je objekt, který obsahuje pole 'teams' s alespoň 8 týmy.
  const updatedBracket = fillTeamsInMatches(tournamentData, tournamentData.matches);
*/
  // A tady můžete zkontrolovat výsledek
  console.log(tournamentData);
  if (tournamentData.matches.length > 0)
    return (
      <SingleEliminationBracket
        theme={GlootTheme}
      matches={tournamentData.matches}
      matchComponent={Match}
      options={{
        style: {
          connectorColor: GlootTheme.connectorColor, // Předpokládáme, že chcete bílou barvu pro konektory
          connectorColorHighlight: GlootTheme.connectorColorHighlight, // Jasně zelená
          svgBackground: GlootTheme.svgBackground,
        },

      }}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          width={10000}
          height={5000}
          background="#ffffff"  // Tady nastavíte bílé pozadí
          SVGBackground="#ffffff"  // Tady také nastavíte bílé pozadí
          {...props}
        >
          {children}
        </SVGViewer>

      )}
      onMatchClick={(match) => console.log(match)}
        onPartyClick={(match) => console.log(match)}
      />
    )
  else
    return (
      <div>
        <h1>Turnaj ještě nezačal</h1>
      </div>
    )
};


export const simpleSmallBracket = [
  {
    id: 19753,
    nextMatchId: null,
    tournamentRoundText: "3",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: []
  },
  { // Semifanal zapasu 1
    id: 19754,
    nextMatchId: 19753,
    tournamentRoundText: "2",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: []
  },
  { // zapas 1
    id: 19755,
    nextMatchId: 19754,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "SCORE_DONE",
    participants: []
  },
  { // zapas 2
    id: 19756,
    nextMatchId: 19754,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "RUNNING",
    participants: []
  },
  { // semifinale 2. zápas
    id: 19757,
    nextMatchId: 19753,
    tournamentRoundText: "2",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: []
  },
  { // zapas 3
    id: 19758,
    nextMatchId: 19757,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: []
  },
  { // zapas 4
    id: 19759,
    nextMatchId: 19757,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: []
    
  },


];

export default SingleElimination;