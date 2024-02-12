import { PlayerInfo } from "../../../types";
import { calculateSum } from "./calculateSum";

export function calculateWinners(
  allPlayerInfo: PlayerInfo[],
  players: string[]
) {
  if (!allPlayerInfo) {
    return;
  }

  const dealerSum = calculateSum(allPlayerInfo?.[0].hand);
  const playerSums = allPlayerInfo
    .slice(1)
    .map((player) => calculateSum(player.hand));

  const winners: string[] = [];

  playerSums.forEach((sum, index) => {
    if (sum > 21) {
      return;
    } else if (dealerSum > 21) {
      winners.push(players[index]);
    } else if (sum > dealerSum) {
      winners.push(players[index]);
    } else if (sum === dealerSum) {
      winners.push(players[index]);
    }
  });

  return winners;
}
