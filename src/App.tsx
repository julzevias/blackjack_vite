import { useState } from "react";
import { PlayerInfo } from "./types";
import createDeck from "./components/setup/CreateDeck";
import InitializePlayers from "./components/setup/InitializePlayers";
import { DeckContext } from "./useContext/context";
import createPlayerHands from "./components/setup/CreatePlayerHands";
import GameBoard from "./components/gameBoard/GameBoard";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
  const [deck, setDeck] = useState<string[]>(createDeck);
  const [allPlayerInfo, setAllPlayerInfo] = useState<PlayerInfo[]>([]);

  const initializeGameStart = (players: string[]) => {
    const allPlayerInfo = createPlayerHands(players, deck);
    setAllPlayerInfo(allPlayerInfo);
    setHasGameStarted(true);
  };

  if (hasGameStarted === false) {
    return (
      <InitializePlayers
        addPlayers={(players: string[]) => initializeGameStart(players)}
      />
    );
  } else {
    return (
      <DeckContext.Provider
        value={{
          deck: deck,
          allPlayerInfo: allPlayerInfo,
          setDeck: setDeck,
          setAllPlayerInfo: setAllPlayerInfo,
        }}
      >
        <GameBoard />
      </DeckContext.Provider>
    );
  }
}

export default App;
