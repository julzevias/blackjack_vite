import { PlayerInfo } from "../../../types";
import { calculateSum } from "./calculateSum";

export function hit(
  currentPlayer: string,
  deck: string[],
  setDeck: (card: string[]) => void,
  allPlayerInfo: PlayerInfo[],
  setAllPlayerInfo: (allPlayerInfo: PlayerInfo[]) => void
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

  const sum = calculateSum(currentPlayerHand || []);

  // 3. Set the playerInfo state with the new or old playerInfo
  sum < 21
    ? setAllPlayerInfo?.(newAllPlayerInfo)
    : setAllPlayerInfo(allPlayerInfo);
  setDeck?.(newDeck);

  return sum;
}
