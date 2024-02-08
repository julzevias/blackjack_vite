import { createContext } from "react";
import { PlayerInfo } from "../types";

interface GameContextProps {
  deck: string[];
  allPlayerInfo: PlayerInfo[];
  setDeck: (card: string[]) => void;
  setAllPlayerInfo: (allPlayerInfo: PlayerInfo[]) => void;
}

export const DeckContext = createContext<GameContextProps | undefined>(
  undefined
);
