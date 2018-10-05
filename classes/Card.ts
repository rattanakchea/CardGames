export enum SuitEnum {
  Club = "club",
  Diamond = "diamond",
  Heart = "heart",
  Spade = "spade"
}

type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class Card {
  suit: string;
  value: number;

  constructor(suit: string, value: CardValue | number) {
    this.suit = suit;
    this.value = value;
  }

  equal(card2: Card) {
    return this.value === card2.value;
  }
}
