import { PlayerInfo } from "../types";
import { drawCard } from "./playerActions/drawCard";

export default function createPlayerHands(
  players: string[],
  deck: string[]
): PlayerInfo[] {
  const allPeople: string[] = ["Dealer", ...players];
  const allPlayerInfo: PlayerInfo[] = [];

  allPeople.forEach((person: string) => {
    const player: PlayerInfo = { name: "", hand: [] };

    player.name = person;
    player.hand.push(drawCard(deck) as string);
    player.hand.push(drawCard(deck) as string);

    allPlayerInfo.push(player);
  });

  return allPlayerInfo;
}
