import { CardGame } from "./CardGame";

export class BlackJack extends CardGame {
  constructor(numOfPlayers: number = 2) {
    super(numOfPlayers);
  }
}

// testing blackjack game

let game = new BlackJack();

console.log(game);
