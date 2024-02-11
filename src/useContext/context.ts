import { createContext } from "react";
import { GameContextProps } from "../types";

export const DeckContext = createContext<GameContextProps | undefined>(
  undefined
);
