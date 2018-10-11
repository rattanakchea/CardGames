import { Card } from "./Card";

// each player hold a number of cards
// +throwCard();

export class Player {
  hand: Card[];

  constructor() {
    this.hand = [];
  }

  addCard(card: Card) {
    this.hand.push(card);
  }

  getTotal() {
    let total = this.hand.reduce((subTotal, card) => {
      return subTotal + card.value;
    }, 0);

    return total;
  }
}
