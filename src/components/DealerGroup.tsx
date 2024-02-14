import { useContext, useState } from "react";
import { GameContextProps, PlayerInfo } from "../types";
import { DeckContext } from "../useContext/context";
import Banner from "./common/Banner";
import Card from "./Card";
import { runDealerTurn } from "../helpers/runDealerTurn";

const DealerGroup = ({
  playerInfo,
  currentPlayer,
  setCurrentPlayer,
}: {
  playerInfo: PlayerInfo[];
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
}) => {
  const { deck, setDeck, allPlayerInfo, setAllPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};
  const [flipCard, setFlipCard] = useState<boolean>(false);

  const handleDealerTurn = () => {
    runDealerTurn(allPlayerInfo!, deck, setAllPlayerInfo!, setDeck!);

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
    <div>
      <div className="d-flex justify-content-center m-1">
        {playerInfo.map((player: PlayerInfo) => {
          return (
            <div
              key={player.name}
              className="flex-column align-items-center m-3"
            >
              <div className="text-center">
                <h3 className="text-secondary">Dealer</h3>
                {player?.roundRoles?.length > 0 && (
                  <div className="d-flex justify-content-center">
                    {player.roundRoles.map((role: string) => {
                      return <Banner key={`${player}-${role}`} role={role} />;
                    })}
                  </div>
                )}
              </div>
              <div
                className={`d-flex ${
                  player.name === "Dealer" ? "flex-row" : "flex-column"
                }`}
              >
                {player.hand.map((card: string, i: number) => {
                  const cardToDisplay =
                    player.name === "Dealer" && i === 1 && !flipCard
                      ? "1B"
                      : card;

                  const src = `/src/assets/poker-qr/` + cardToDisplay + `.svg`;

                  return <Card key={card} src={src} alt={card} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center">
        {currentPlayer === "Dealer" && (
          <button
            onClick={handleDealerTurn}
            className="btn btn-outline-info border"
          >
            Play Dealer Turn
          </button>
        )}
      </div>
    </div>
  );
};

export default DealerGroup;
