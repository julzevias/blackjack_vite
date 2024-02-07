import { createContext } from "react";
import { Card, PlayerInfo } from "../types";

interface GameContextProps {
  deck: Card[];
  allPlayerInfo: PlayerInfo[];
  setDeck: (card: Card[]) => void;
  setAllPlayerInfo: (allPlayerInfo: PlayerInfo[]) => void;
}

export const DeckContext = createContext<GameContextProps | undefined>(
  undefined
);
