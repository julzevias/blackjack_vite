import { useContext, useState } from "react";
import { GameContextProps, PlayerInfo } from "../../types";
import { DeckContext } from "../../useContext/context";
import { hit } from "./helpers/hit";
import { calculateSum } from "./helpers/calculateSum";
import { calculateWinners } from "./helpers/calculateWinners";

const PlayerHand = ({ playerInfo }: { playerInfo: PlayerInfo[] }) => {
  const { deck, setDeck, allPlayerInfo, setAllPlayerInfo } =
    useContext<GameContextProps | undefined>(DeckContext) || {};

  const players = playerInfo.map((player: PlayerInfo) => player.name);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    players[players.length - 1]
  );
  const [confirmDealerTurn, setConfirmDealerTurn] = useState<boolean>(false);
  const [busted, setBusted] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);

  const determineWinners = () => {
    const winners = calculateWinners(allPlayerInfo!, players);

    setWinners(winners || []);
  };

  const runDealerTurn = () => {
    //1. calculate sum of dealer's hand
    //2. while sum < 17, hit
    //3. if sum >= 17, calculate Winners

    let localDeck = [...deck!];
    let localAllPlayerInfo = [...allPlayerInfo!];

    let dealerHand = allPlayerInfo?.[0].hand;
    let dealerSum = calculateSum(dealerHand || []);

    while (dealerSum < 17) {
      const result = hit("Dealer", localDeck, localAllPlayerInfo);
      dealerHand = result?.newAllPlayerInfo[0].hand;
      dealerSum = calculateSum(dealerHand || []);
      localDeck = result?.newDeck || [];
      localAllPlayerInfo = result?.newAllPlayerInfo || [];
    }

    if (dealerSum > 21) {
      setBusted([...busted, "Dealer"]);
    }
    if (setDeck && setAllPlayerInfo) {
      setDeck(localDeck);
      setAllPlayerInfo(localAllPlayerInfo);
    }

    determineWinners();
  };

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

    if (index === 0) {
      setConfirmDealerTurn(true);
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

      if (newSum > 21 && !isDealerTurn) {
        setAllPlayerInfo?.(newAllPlayerInfo);
        setBusted([...busted, result?.playerName]);
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
      {confirmDealerTurn && (
        <button onClick={runDealerTurn} className="btn text-light border">
          Take Dealer Turn
        </button>
      )}
      <div className="d-flex justify-content-center m-1">
        {playerInfo.map((player: PlayerInfo) => {
          return (
            <div
              key={player.name}
              className="flex-column align-items-center m-3"
            >
              <div className="text-center">
                {winners.includes(player.name) && (
                  <div className="bg-success text-light rounded">WINNER</div>
                )}
                <h3>{player.name}</h3>
                {busted.includes(player.name) && (
                  <div className="bg-danger text-light rounded">BUSTED</div>
                )}
              </div>
              <div
                className={`d-flex ${
                  player.name === "Dealer" ? "flex-row" : "flex-column"
                }`}
              >
                {player.hand.map((card: string) => {
                  return (
                    <img
                      key={card}
                      src={`/src/assets/poker-qr/` + card + `.svg`}
                      alt={card}
                      className="card m-2"
                    />
                  );
                })}
              </div>
              {player.name === currentPlayer && player.name !== "Dealer" && (
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
      </div>
    </>
  );
};

export default PlayerHand;
