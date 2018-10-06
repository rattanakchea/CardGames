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
}

// test player
let p = new Player();
p.addCard(new Card("heart", 1));
p.addCard(new Card("heart", 7));

console.log(p);
console.log(p.hasCard(2));
console.log(p.getTotal());
