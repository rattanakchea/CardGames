import { CardGame } from "./CardGame";
import { Player } from "./Player";

// add logic for BlackJack card game
export class BlackJack extends CardGame {
  constructor(numOfPlayers: number = 2) {
    super(numOfPlayers);
  }

  isBlackJack(player: Player) {
    return (
      (player.hasCard(1) && player.hasCard(10)) || player.getTotal() === 21
    );
  }
}

// testing blackjack game
let game = new BlackJack();

// two players with empty hands
let dealer = new Player();
let player1 = new Player();

// deal 1 card to player 1, 2 to player 2
game.dealCard(dealer, 2); //one card is face down
game.dealCard(player1, 2);

console.log("dealer:", dealer);
console.log("player1:", player1);

// check the cards of each player
if (game.isBlackJack(player1) && !game.isBlackJack(dealer)) {
  console.log("Player 1 wins");
} else if (game.isBlackJack(player1) && game.isBlackJack(dealer)) {
  console.log("This is a tie, both have BlackJack");
} else if (game.isBlackJack(dealer)) {
  console.log("Dealer wins");
}

// continue the game
