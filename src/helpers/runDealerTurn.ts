import { PlayerInfo } from "../types";
import { calculateSum } from "./calculateSum";
import { calculateWinners } from "./calculateWinners";
import { hit } from "./hit";

export function runDealerTurn(
  allPlayerInfo: PlayerInfo[],
  deck: string[] | undefined,
  setAllPlayerInfo: (playerInfo: PlayerInfo[]) => void,
  setDeck: (deck: string[]) => void
) {
  //1. calculate sum of dealer's hand
  let localDeck = [...deck!];
  let localAllPlayerInfo = [...allPlayerInfo!];

  let dealerHand = allPlayerInfo?.[0].hand;
  let dealerSum = calculateSum(dealerHand || []);

  //2. while sum < 17, hit
  while (dealerSum < 17) {
    const result = hit("Dealer", localDeck, localAllPlayerInfo);
    dealerHand = result?.newAllPlayerInfo[0]?.hand || [];
    dealerSum = calculateSum(dealerHand || []);
    localDeck = result?.newDeck || [];
    localAllPlayerInfo = result?.newAllPlayerInfo || [];
  }

  if (dealerSum > 21 && !localAllPlayerInfo[0].roundRoles.includes("BUSTED")) {
    localAllPlayerInfo[0].roundRoles.push("BUSTED");
  }

  //3. if sum >= 17 and player is not busted or blackjack, calculate winners
  calculateWinners(localAllPlayerInfo);

  if (setDeck && setAllPlayerInfo) {
    setDeck(localDeck);
    setAllPlayerInfo(localAllPlayerInfo);
  }
}
