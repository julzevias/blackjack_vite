import { useContext } from "react";
import PlayerGroup from "./PlayerGroup";
import { DeckContext } from "../../useContext/context";
import { GameContextProps } from "../../types";

const GameBoard = () => {
  const { allPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};

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
        <h3 className="text-center">Dealer</h3>
        <div className="d-flex justify-content-center">
          {allPlayerInfo[0].hand.map((card: string) => {
            return (
              <img
                key={card}
                src={`/src/assets/poker-qr/` + card + `.svg`}
                alt={card}
                className="card mx-2"
              />
            );
          })}
        </div>
      </div>
      <div className="d-flex">
        <PlayerGroup playerInfo={allPlayerInfo.slice(1)} />
      </div>
    </div>
  );
};

export default GameBoard;
