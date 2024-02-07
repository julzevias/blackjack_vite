import { useState } from "react";
import { Card, PlayerInfo } from "./types";
import createDeck from "./components/createDeck";
import InitializePlayers from "./components/InitializePlayers";
import { DeckContext } from "./useContext/context";
import startGameSetup from "./components/startGameSetup";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
  const [deck, setDeck] = useState<Card[]>(() => {
    return createDeck();
  });
  const [allPlayerInfo, setAllPlayerInfo] = useState<PlayerInfo[]>([]);

  const startGame = (bool: boolean) => {
    startGameSetup();
    setHasGameStarted(bool);
  };

  if (hasGameStarted === false) {
    return (
      <InitializePlayers setStartGame={(bool: boolean) => startGame(bool)} />
    );
  } else {
    return (
      <>
        <DeckContext.Provider
          value={{
            deck: deck,
            allPlayerInfo: allPlayerInfo,
            setDeck: setDeck,
            setAllPlayerInfo: setAllPlayerInfo,
          }}
        >
          <div>Game is starting...</div>
        </DeckContext.Provider>
      </>
    );
  }
}

export default App;
