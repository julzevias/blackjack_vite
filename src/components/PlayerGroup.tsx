import { useContext } from "react";
import { GameContextProps, PlayerInfo } from "../types";
import { DeckContext } from "../useContext/context";
import { hit } from "../helpers/hit";
import { calculateSum } from "../helpers/calculateSum";
import Banner from "./common/Banner";
import Card from "./Card";
import { stand } from "../helpers/stand";

const PlayerHand = ({
  playerInfo,
  players,
  currentPlayer,
  setCurrentPlayer,
}: {
  playerInfo: PlayerInfo[];
  players: string[];
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
}) => {
  const { deck, setDeck, allPlayerInfo, setAllPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};

  const onHit = () => {
    if (!allPlayerInfo || !deck) {
      return;
    }

    const result = hit(currentPlayer, deck, allPlayerInfo);
    updateContext(
      result as {
        playerName: string;
        newAllPlayerInfo: PlayerInfo[];
        newSum: number;
        newDeck: string[];
      }
    );
  };

  const onStand = () => {
    const indexCurrPlayer = players.indexOf(currentPlayer);

    stand(indexCurrPlayer, players, allPlayerInfo!, setAllPlayerInfo);
    setCurrentPlayer(players[indexCurrPlayer - 1]);
  };

  const updateContext = (result: {
    playerName: string;
    newAllPlayerInfo: PlayerInfo[];
    newSum: number;
    newDeck: string[];
  }) => {
    if (result !== undefined) {
      const isDealerTurn = result?.playerName === "Dealer";
      const newSum = result?.newSum;
      const newAllPlayerInfo = result.newAllPlayerInfo;
      const newDeck = result.newDeck;

      if (newSum >= 21 && !isDealerTurn) {
        setAllPlayerInfo?.(newAllPlayerInfo);
        onStand();
      } else if (newSum > 17 && isDealerTurn) {
        setAllPlayerInfo?.(newAllPlayerInfo);
      } else {
        setAllPlayerInfo?.(newAllPlayerInfo);
      }

      setDeck?.(newDeck);
    }
  };

  return (
    <>
      {playerInfo.map((player: PlayerInfo) => {
        const sum = calculateSum(player.hand);
        return (
          <div
            key={player.name}
            className=" flex-column align-items-center m-2  mb-5 pb-5 pt-3"
          >
            <div className="text-center">
              <div className="empty-50 d-flex justify-content-center">
                {player?.roundRoles?.length > 0 && (
                  <>
                    {player.roundRoles.map((role: string) => {
                      return <Banner key={`${player}-${role}`} role={role} />;
                    })}
                  </>
                )}
              </div>
              <h4 className="text-secondary mb-2">
                {player.name}
                <span className="badge rounded-pill bg-info border border-dark">
                  {sum}
                </span>
              </h4>
            </div>

            <div
              className={`d-flex ${
                player.name === "Dealer"
                  ? "flex-row "
                  : "flex-column align-items-center"
              }`}
            >
              {player.hand.map((card: string) => {
                const src = `/poker-qr/` + card + `.svg`;
                return (
                  <div key={card} className="show-hidden-cards">
                    <Card src={src} alt={card} />
                  </div>
                );
              })}
            </div>

            <div className="m-2 mt-4 mb-4">
              {player.name === currentPlayer && player.name !== "Dealer" && (
                <div className="btn-group-sm btn-group-vertical d-flex justify-content-center position-relative gap-2">
                  {sum !== 21 && (
                    <button
                      onClick={onHit}
                      className="btn btn-secondary border border-dark"
                    >
                      Hit
                    </button>
                  )}

                  <button
                    onClick={onStand}
                    className="btn btn-secondary border border-dark"
                  >
                    Stand
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlayerHand;
