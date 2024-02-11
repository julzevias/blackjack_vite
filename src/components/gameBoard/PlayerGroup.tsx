import { useState } from "react";
import { PlayerInfo } from "../../types";

const PlayerHand = ({ playerInfo }: { playerInfo: PlayerInfo[] }) => {
  const players = playerInfo.map((player: PlayerInfo) => player.name);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players[players.length - 1]
  );

  const runDealerTurn = () => {
    console.log("dealer turn");
  };

  const onHit = () => {
    return <>onhit</>;
  };

  const onStand = () => {
    const index = players.indexOf(currentPlayer);

    if (index === 0) {
      runDealerTurn();
    }

    setCurrentPlayer(players[index - 1]);
  };

  return (
    <>
      {playerInfo.map((player: PlayerInfo) => {
        return (
          <div key={player.name} className="flex-column align-items-center m-3">
            <h3 className="text-center">{player.name}</h3>
            <div className="d-flex flex-column">
              {player.hand.map((card: string) => {
                return (
                  <img
                    key={card}
                    src={`/src/assets/poker-qr/` + card + `.svg`}
                    alt={card}
                    className="card mb-2"
                  />
                );
              })}
            </div>
            {player.name === currentPlayer && (
              <div className="d-flex gap-2">
                <button onClick={onHit} className="btn flex-grow-1 border">
                  Hit
                </button>
                <button onClick={onStand} className="btn flex-grow-1 border">
                  Stand
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default PlayerHand;
