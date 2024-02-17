import { PlayerInfo } from "../types";
import { calculateSum } from "./calculateSum";

export default function createPlayerHands(
  players: string[],
  deck: string[]
): PlayerInfo[] {
  const allPeople: string[] = ["Dealer", ...players];
  const allPlayerInfo: PlayerInfo[] = [];

  allPeople.forEach((person: string) => {
    const player: PlayerInfo = { name: "", hand: [], roundRoles: [] };

    player.name = person;
    player.hand.push(drawCard(deck) as string);
    player.hand.push(drawCard(deck) as string);
    player.roundRoles = [];

    allPlayerInfo.push(player);
  });

  // check if first player hand is blackjack
  if (calculateSum(allPlayerInfo[allPlayerInfo.length - 1].hand) === 21) {
    allPlayerInfo[allPlayerInfo.length - 1].roundRoles.push("BLACKJACK");
  }

  return allPlayerInfo;
}

const drawCard = (deck: string[]): string | undefined => {
  return deck.shift();
};
