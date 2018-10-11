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

  // there needs complex logic here
  // 10 + 11/12/13 = 20
  // 1 + 10/12/13 = BlackJack
  getTotal() {
    let total = this.hand.reduce((subTotal, card) => {
      if (card.value >= 10) {
        return subTotal + 10;
      } else {
        return subTotal + card.value;
      }
    }, 0);
    return total;
  }

  // check if the player has BlackJack 1 + 10
  isBlackJack(): boolean {
    return (
      (this.hasCard(1) && this.hasCard(10)) ||
      (this.hasCard(1) && this.hasCard(11)) ||
      this.getTotal() === 21
    );
  }
}
