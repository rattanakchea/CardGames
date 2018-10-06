import { Card } from "./Card";

// each player hold a number of cards
// +throwCard();

export class Player {
  private hand: Card[];

  constructor() {
    this.hand = [];
  }

  addCard(card: Card) {
    this.hand.push(card);
  }
}
