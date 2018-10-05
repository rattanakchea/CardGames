import { Card } from "./Card";

// each player hold a number of cards
// +throwCard();

export class Player {
  hand: Card[];

  constructor() {
    this.hand = [];
  }
}
