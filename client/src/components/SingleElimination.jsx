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

  console.log(tournamentData);
  simpleSmallBracket.forEach(match => {
    if (match.tournamentRoundText === "1") {
        // Získání indexu zápasu v prvním kole
        const matchIndex = match.id - 19755;

        // Získání indexu týmu pro každý zápas
        const firstTeamIndex = matchIndex * 2;
        const secondTeamIndex = firstTeamIndex + 1;

        // Přiřazení prvního týmu k zápasu
        if (tournamentData.teams[firstTeamIndex]) {
            match.participants[0] = {
                id: tournamentData.teams[firstTeamIndex].id.toString(),
                name: tournamentData.teams[firstTeamIndex].name,
            };
        }

        // Přiřazení druhého týmu k zápasu, pokud existuje
        if (tournamentData.teams[secondTeamIndex]) {
            match.participants[1] = {
                id: tournamentData.teams[secondTeamIndex].id.toString(),
                name: tournamentData.teams[secondTeamIndex].name,
            };
        }
    }
});

  return (
    <SingleEliminationBracket
      theme={GlootTheme}
      matches={simpleSmallBracket}
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

};


export const simpleSmallBracket = [
  {
    id: 19753,
    nextMatchId: null,
    tournamentRoundText: "3",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: [

    ]
  },
  { // Semifanal zapasu 1
    id: 19754,
    nextMatchId: 19753,
    tournamentRoundText: "2",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: [
      {
        id: "14754a1a-932c-4992-8dec-f7f94a339960",
        resultText: null,
        isWinner: false,
        status: null,
        name: "CoKe BoYz",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  { // zapas 1
    id: 19755,
    nextMatchId: 19754,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "SCORE_DONE",
    participants: [
      {
        id: "14754a1a-932c-4992-8dec-f7f94a339960",
        resultText: "Won",
        isWinner: true,
        status: "PLAYED",
        name: "CoKe BoYz",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
        resultText: "Lost",
        isWinner: false,
        status: "PLAYED",
        name: "gggonext",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  { // zapas 2
    id: 19756,
    nextMatchId: 19754,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "RUNNING",
    participants: [
      {
        id: "d8b9f00a-0ffa-4527-8316-da701894768e",
        resultText: null,
        isWinner: true,
        status: null,
        name: "Art of kill",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "9397971f-4b2f-44eb-a094-722eb286c59b",
        resultText: null,
        isWinner: false,
        status: null,
        name: "Crazy Pepes",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
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
    participants: [
      {
        id: "9397971f-4b2f-44eb-a094-722eb286c59b",
        resultText: null,
        isWinner: false,
        status: null,
        name: "Crazy Pepes",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "9397971f-4b2f-44eb-a094-722eb286c59b",
        resultText: null,
        isWinner: false,
        status: null,
        name: "Crazy Pepes",
        picture: "teamlogos/client_team_default_logo"
      }

    ]
  },
  { // zapas 4
    id: 19759,
    nextMatchId: 19757,
    tournamentRoundText: "1",
    startTime: "2021-05-30",
    state: "SCHEDULED",
    participants: [
      {
        id: "42fecd89-dc83-4821-80d3-718acb50a30c",
        resultText: null,
        isWinner: false,
        status: null,
        name: "BLUEJAYS",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "df01fe2c-18db-4190-9f9e-aa63364128fe",
        resultText: null,
        isWinner: false,
        status: null,
        name: "Bosphorus",
        picture: "teamlogos/r7zn4gr8eajivapvjyzd"
      }
    ]
  },


];

export default SingleElimination;