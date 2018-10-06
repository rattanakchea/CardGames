import { Card } from "./Card";
import { Player } from "./Player";

// each player hold a number of cards
// +throwCard();

export class BlackJackPlayer extends Player {
  constructor() {
    super();
  }

  // check if player has a specific card in hand
  hasCard(cardValue: number) {
    return this.hand.some(c => {
      return c.value === cardValue;
    });
  }

  getTotal() {
    let total = this.hand.reduce((subTotal, card) => {
      return subTotal + card.value;
    }, 0);

    return total;
  }

  // check if the player has BlackJack 1 + 10
  isBlackJack(): boolean {
    return (this.hasCard(1) && this.hasCard(10)) || this.getTotal() === 21;
  }
}
