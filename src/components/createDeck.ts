import { Card } from "../types";

export default function createDeck() {
  const suits = ["♦️", "♠️", "♥️", "♣️"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck: Card[] = [];

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card: Card = {};
      card[values[i]] = suits[j];
      deck.push(card);
    }
  }

  // shuffle the deck
  for (let k = 0; k < deck.length - 1; k++) {
    const rand: number = Math.floor(Math.random() * deck.length);

    [deck[k], deck[rand]] = [deck[rand], deck[k]];
  }

  return deck;
}
