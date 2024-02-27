import { useContext, useState } from "react";
import DealerGroup from "@/components/DealerGroup";
import PlayerGroup from "@/components/PlayerGroup";
import { DeckContext } from "@/useContext/context";
import { GameContextProps, PlayerInfo } from "@/types";

const GameBoard = ({
  restart,
}: {
  restart: (playerNames: string[]) => void;
}) => {
  const { allPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};

  const players = allPlayerInfo!.map((player: PlayerInfo) => player.name);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players[players.length - 1]
  );

  const onRestart = () => {
    const playerNames = allPlayerInfo!
      .slice(1)
      .map((player: PlayerInfo) => player.name);
    restart(playerNames);
    setCurrentPlayer(players[players.length - 1]);
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center m-4">
        <button
          className={`${
            currentPlayer === "EndOfRound" ? "" : "invisible"
          } btn btn-primary btn-lg border`}
          onClick={onRestart}
        >
          Restart
        </button>

        <div className="d-flex justify-content-center">
          <DealerGroup
            playerInfo={allPlayerInfo!.slice(0, 1)}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        </div>
      </div>
      <div className="player-group-container d-flex justify-content-center flex-wrap">
        <PlayerGroup
          playerInfo={allPlayerInfo!.slice(1)}
          players={players}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
        />
      </div>
    </div>
  );
};

export default GameBoard;
