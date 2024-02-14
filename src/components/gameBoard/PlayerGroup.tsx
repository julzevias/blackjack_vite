import { useContext } from "react";
import { GameContextProps, PlayerInfo } from "../../types";
import { DeckContext } from "../../useContext/context";
import { hit } from "./helpers/hit";
import { calculateSum } from "./helpers/calculateSum";
import Banner from "../common/Banner";

const PlayerHand = ({
  playerInfo,
  players,
  currentPlayer,
  setCurrentPlayer,
  flipCard,
}: {
  playerInfo: PlayerInfo[];
  players: string[];
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  flipCard: boolean;
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
    const index = players.indexOf(currentPlayer);

    //check next player sum !== 21, else give them blackjack
    const nextPlayer = players[index - 1] ?? 0;
    const nextPlayerHand = allPlayerInfo?.find(
      (player) => player.name === nextPlayer
    )?.hand;
    const nextPlayerSum = calculateSum(nextPlayerHand || []);

    if (nextPlayerSum === 21) {
      const localAllPlayerInfo = [...allPlayerInfo!];
      localAllPlayerInfo
        ?.find((player) => player.name === nextPlayer)
        ?.roundRoles.push("BLACKJACK");
      setAllPlayerInfo?.(localAllPlayerInfo);
    }

    setCurrentPlayer(players[index - 1]);
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
      <div className="d-flex justify-content-center m-1">
        {playerInfo.map((player: PlayerInfo) => {
          const sum = calculateSum(player.hand);
          return (
            <div
              key={player.name}
              className="flex-column align-items-center m-3"
            >
              <div className="text-center">
                <h3>{player.name}</h3>
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

                  return (
                    <img
                      key={card}
                      src={`/src/assets/poker-qr/` + cardToDisplay + `.svg`}
                      alt={card}
                      className="card m-2"
                    />
                  );
                })}
              </div>
              {player.name === currentPlayer && player.name !== "Dealer" && (
                <div className="d-flex gap-2">
                  {sum !== 21 && (
                    <button onClick={onHit} className="btn flex-grow-1 border">
                      Hit
                    </button>
                  )}

                  <button onClick={onStand} className="btn flex-grow-1 border">
                    Stand
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlayerHand;
