export interface PlayerInfo {
  name: string;
  hand: string[];
}

export interface GameContextProps {
  deck: string[];
  allPlayerInfo: PlayerInfo[];
  setDeck: (card: string[]) => void;
  setAllPlayerInfo: (allPlayerInfo: PlayerInfo[]) => void;
}
