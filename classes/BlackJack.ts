import { CardGame } from "./CardGame";
import { Player } from "./Player";

// add logic for BlackJack card game
export class BlackJack extends CardGame {
  constructor(numOfPlayers: number = 2) {
    super(numOfPlayers);
  }
}

// testing blackjack game

let game = new BlackJack();

let player1 = new Player();
let player2 = new Player();

console.log(game);
