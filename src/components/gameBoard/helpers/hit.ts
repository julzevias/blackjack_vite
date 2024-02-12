import { PlayerInfo } from "../../../types";
import { calculateSum } from "./calculateSum";

export function hit(
  currentPlayer: string,
  deck: string[],
  allPlayerInfo: PlayerInfo[]
) {
  if (!allPlayerInfo || !deck) {
    return;
  }

  // 1. draw a card and add it to the current player's hand
  const newCard = deck?.[0];
  const newDeck = deck?.slice(1);

  const newAllPlayerInfo = allPlayerInfo.map((player) => {
    if (player.name === currentPlayer) {
      return { ...player, hand: [...player.hand, newCard] };
    } else {
      return player;
    }
  });

  // 2. Calculate the sum of the current player's hand
  const currentPlayerHand = newAllPlayerInfo.find(
    (player) => player.name === currentPlayer
  )?.hand;

  const newSum = calculateSum(currentPlayerHand || []);

  return {
    playerName: currentPlayer,
    newAllPlayerInfo: newAllPlayerInfo,
    newSum: newSum,
    newDeck: newDeck,
  };
}
