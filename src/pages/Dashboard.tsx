import { useContext, useState } from "react";
import { DeckContext } from "../useContext/context";

const Dashboard = () => {
  const { deck, allPlayerInfo } = useContext(DeckContext);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center">
          <h3>Dealer</h3>
          <div className="d-flex">
            {allPlayerInfo[0].hand.map((card: string) => {
              return (
                <img
                  key={card}
                  src={`/src/assets/poker-qr/` + card + `.svg`}
                  alt={card}
                  className="m-3"
                />
              );
            })}
          </div>
        </div>
        <div>players</div>
      </div>
    </>
  );
};

export default Dashboard;
