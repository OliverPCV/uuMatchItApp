import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme
} from "@g-loot/react-tournament-brackets";
import MatchUpdate from "./MatchUpdate";
import { useState } from "react";
import { fetchUserData } from "../services/authService";


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
  // ... zbytek vašeho kódu ...

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actualOwner, setActualOwner] = useState({ id: '' });

  useState(() => {
    fetchUserData().then(userData => {
      setActualOwner({ id: userData.id });
      console.log("husty", userData.id);
    }).catch(error => {
      console.error('Chyba při načítání uživatelských dat:', error);
    });
  }, []);


  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setShowModal(true);
  };

  console.log("taky", tournamentData);

  // Vraťte komponentu SingleEliminationBracket a připojte k ní MatchUpdate
  if (tournamentData.matches.length > 0) {
    return (
      <div>
        <SingleEliminationBracket
          theme={GlootTheme}
          matches={tournamentData.matches}
          matchComponent={Match}
          options={{
            style: {
              connectorColor: GlootTheme.connectorColor,
              connectorColorHighlight: GlootTheme.connectorColorHighlight,
              svgBackground: GlootTheme.svgBackground,
            },
          }}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={10000}
              height={5000}
              background="#ffffff"
              SVGBackground="#ffffff"
              {...props}
            >
              {children}
            </SVGViewer>
          )}
              onMatchClick = {handleMatchClick}
              onPartyClick={(match) => console.log(match)}
        />
        {showModal && (
          <MatchUpdate
            matchData={selectedMatch}
            onHide={() => setShowModal(false)}
            tournamentId={tournamentData.id}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Turnaj ještě nezačal</h1>
      </div>
    );
  }
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