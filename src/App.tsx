import { useState, useEffect } from "react";
import { PlayerInfo } from "@/types";
import createDeck from "@/helpers/createDeck";
import PlayerNameInput from "@/components/PlayerNameInput";
import { DeckContext } from "@/useContext/context";
import createPlayerHands from "@/helpers/createPlayerHands";
import GameBoard from "@/components/GameBoard";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
  const [deck, setDeck] = useState<string[]>(createDeck);
  const [allPlayerInfo, setAllPlayerInfo] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    if (deck.length === 0) {
      setDeck(createDeck());
    }
  }, [deck]);

  const initializeGameStart = (players: string[]) => {
    const allPlayerInfo = createPlayerHands(players, deck);
    setAllPlayerInfo(allPlayerInfo);
    setHasGameStarted(true);
  };

  if (hasGameStarted === false) {
    return (
      <div className="container-fluid p-3">
        <PlayerNameInput
          startGame={(players: string[]) => initializeGameStart(players)}
        />
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <DeckContext.Provider
          value={{
            deck: deck,
            allPlayerInfo: allPlayerInfo,
            setDeck: setDeck,
            setAllPlayerInfo: setAllPlayerInfo,
          }}
        >
          <div className="blackjack-logo d-flex justify-content-center w-100 position-relative">
            <GameBoard restart={initializeGameStart} />
          </div>
        </DeckContext.Provider>
      </div>
    );
  }
}

export default App;
