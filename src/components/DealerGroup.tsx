import { useContext } from "react";
import { GameContextProps, PlayerInfo } from "@/types";
import { DeckContext } from "@/useContext/context";
import Banner from "@/components/common/Banner";
import Card from "@/components/Card";
import { runDealerTurn } from "@/helpers/runDealerTurn";
import { calculateSum } from "@/helpers/calculateSum";

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

  const isDealerBlackjack = allPlayerInfo![0].roundRoles?.includes("BLACKJACK");

  const handleDealerTurn = () => {
    runDealerTurn(allPlayerInfo!, deck, setAllPlayerInfo!, setDeck!);

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
    <>
      {playerInfo.map((dealer: PlayerInfo) => {
        const sum = calculateSum(dealer.hand);
        return (
          <div key={dealer.name} className="flex-column align-items-center m-3">
            <div className="text-center">
              <h3 className="text-secondary">
                Dealer{" "}
                {currentPlayer === "EndOfRound" && (
                  <span className="badge rounded-pill bg-info border border-dark">
                    {sum}
                  </span>
                )}
              </h3>

              {dealer?.roundRoles?.length > 0 && (
                <div className="d-flex justify-content-center">
                  {dealer.roundRoles.map((role: string) => {
                    return <Banner key={`${dealer}-${role}`} role={role} />;
                  })}
                </div>
              )}
            </div>
            <div className="d-flex flex-row justify-content-center">
              {dealer.hand.map((card: string, i: number) => {
                const cardToDisplay =
                  dealer.name === "Dealer" &&
                  i === 1 &&
                  !isDealerBlackjack &&
                  currentPlayer !== "EndOfRound"
                    ? "1B"
                    : card;

                const src = `/poker-qr/` + cardToDisplay + `.svg`;

                return <Card key={card} src={src} alt={card} />;
              })}
            </div>

            <div className="empty-200 d-flex justify-content-center position-relative p-3">
              {currentPlayer === "Dealer" && !isDealerBlackjack && (
                <button
                  onClick={handleDealerTurn}
                  className="play-dealer-turn btn btn-info btn-lg align-self-center border border-dark"
                >
                  Play Dealer Turn
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DealerGroup;
