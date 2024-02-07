export interface Card {
  [value: string]: string;
}

export interface PlayerInfo {
  hand: Card[];
  isWinner: boolean;
}
