import { useContext, useState } from "react";
import DealerGroup from "./DealerGroup";
import PlayerGroup from "./PlayerGroup";
import { DeckContext } from "../useContext/context";
import { GameContextProps, PlayerInfo } from "../types";

const GameBoard = () => {
  const { allPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};

  const players = allPlayerInfo!.map((player: PlayerInfo) => player.name);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players[players.length - 1]
  );

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="flex-column justify-content-center mt-5 mb-5">
        <div className="d-flex justify-content-center">
          <DealerGroup
            playerInfo={allPlayerInfo!.slice(0, 1)}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        </div>
      </div>
      <div className="player-group-container d-flex flex-column">
        <div className="d-flex justify-content-center flex-wrap">
          <PlayerGroup
            playerInfo={allPlayerInfo!.slice(1)}
            players={players}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
