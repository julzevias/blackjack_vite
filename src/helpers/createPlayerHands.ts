import { PlayerInfo } from "../types";

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

  return allPlayerInfo;
}

const drawCard = (deck: string[]): string | undefined => {
  return deck.shift();
};
