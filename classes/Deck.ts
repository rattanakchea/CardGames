/**
 * Deck of Card class
 * @attr {Card[]} 52 cards in most card games
 */

//  Deck is a class of deck of card
//  - cards: Card[]
//  + shuffle(): void
//  + isEmpty(): boolean

import { Card, SuitEnum } from "./Card";

export class Deck {
  private cards: Card[] = [];

  /**
   * initialize array of cards
   *
   */
  constructor() {
    console.log(SuitEnum);

    for (let value = 1; value <= 13; value++) {
      for (let suit in SuitEnum) {
        let card = new Card(suit, value);
        this.cards.push(card);
      }
    }
    this.shuffle();
  }

  shuffle(): void {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }
}
