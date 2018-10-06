import { CardGame } from "./CardGame";
import { BlackJackPlayer } from "./BlackJackPlayer";

// add logic for BlackJack card game
export class BlackJack extends CardGame {
  constructor(numOfPlayers: number = 2) {
    super(numOfPlayers);
  }
}

// testing blackjack game
let game = new BlackJack();

// two players with empty hands
let dealer = new BlackJackPlayer();
let player1 = new BlackJackPlayer();

// deal 1 card to player 1, 2 to player 2
game.dealCard(dealer, 2); //one card is face down
game.dealCard(player1, 2);

console.log("dealer:", dealer);
console.log("player1:", player1);

// check the cards of each player
if (player1.isBlackJack() && !dealer.isBlackJack) {
  console.log("Player 1 wins");
} else if (player1.isBlackJack() && dealer.isBlackJack()) {
  console.log("This is a tie, both have BlackJack");
} else if (dealer.isBlackJack()) {
  console.log("Dealer wins");
}

// continue the game
