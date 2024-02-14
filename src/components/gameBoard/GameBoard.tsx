import { useContext, useState } from "react";
import PlayerGroup from "./PlayerGroup";
import { DeckContext } from "../../useContext/context";
import { GameContextProps, PlayerInfo } from "../../types";
import { hit } from "./helpers/hit";
import { calculateSum } from "./helpers/calculateSum";
import { calculateWinners } from "./helpers/calculateWinners";

const GameBoard = () => {
  const { deck, setDeck, allPlayerInfo, setAllPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};

  const players = allPlayerInfo!.map((player: PlayerInfo) => player.name);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players[players.length - 1]
  );
  const [flipCard, setFlipCard] = useState<boolean>(false);

  const runDealerTurn = () => {
    //1. calculate sum of dealer's hand
    let localDeck = [...deck!];
    let localAllPlayerInfo = [...allPlayerInfo!];

    let dealerHand = allPlayerInfo?.[0].hand;
    let dealerSum = calculateSum(dealerHand || []);

    //2. while sum < 17, hit
    while (dealerSum < 17) {
      const result = hit("Dealer", localDeck, localAllPlayerInfo);
      dealerHand = result?.newAllPlayerInfo[0].hand;
      dealerSum = calculateSum(dealerHand || []);
      localDeck = result?.newDeck || [];
      localAllPlayerInfo = result?.newAllPlayerInfo || [];
    }

    if (
      dealerSum > 21 &&
      !localAllPlayerInfo[0].roundRoles.includes("BUSTED")
    ) {
      localAllPlayerInfo[0].roundRoles.push("BUSTED");
    }

    //3. if sum >= 17 and player is not busted or blackjack, calculate winners
    calculateWinners(localAllPlayerInfo);
    console.log(localAllPlayerInfo);

    if (setDeck && setAllPlayerInfo) {
      setDeck(localDeck);
      setAllPlayerInfo(localAllPlayerInfo);
    }

    setFlipCard(true);
    setCurrentPlayer("EndOfRound");
  };

  if (!allPlayerInfo) {
    return (
      <div className="d-flex justify-content-center">
        No Player Information detected
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="flex-column justify-content-center m-3">
        <div className="d-flex justify-content-center">
          <PlayerGroup
            playerInfo={allPlayerInfo.slice(0, 1)}
            players={players}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            flipCard={flipCard}
          />
        </div>
      </div>
      {currentPlayer === "Dealer" && (
        <button onClick={runDealerTurn} className="btn text-light border">
          Take Dealer Turn
        </button>
      )}
      <div className="d-flex flex-column">
        <PlayerGroup
          playerInfo={allPlayerInfo.slice(1)}
          players={players}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          flipCard={flipCard}
        />
      </div>
    </div>
  );
};

export default GameBoard;
