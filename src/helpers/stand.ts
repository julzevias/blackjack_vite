import { PlayerInfo } from "../types";
import { calculateSum } from "./calculateSum";

export function stand(
  indexCurrPlayer: number,
  players: string[],
  allPlayerInfo: PlayerInfo[],
  setAllPlayerInfo?: (playerInfo: PlayerInfo[]) => void
) {
  //check next player sum !== 21, else give them "BLACKJACK"
  const nextPlayer = players[indexCurrPlayer - 1] ?? 0;
  const nextPlayerHand = allPlayerInfo?.find(
    (player) => player.name === nextPlayer
  )?.hand;
  const nextPlayerSum = calculateSum(nextPlayerHand || []);

  if (nextPlayerSum === 21) {
    const localAllPlayerInfo = [...allPlayerInfo!];
    localAllPlayerInfo
      ?.find((player) => player.name === nextPlayer)
      ?.roundRoles.push("BLACKJACK");
    setAllPlayerInfo?.(localAllPlayerInfo);
  }
}
