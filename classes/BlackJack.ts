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
if (player1.isBlackJack()) {
  if (dealer.isBlackJack()) {
    console.log("This is a tie, both have BlackJack");
  } else {
    console.log("Player 1 wins");
  }
} else if (dealer.isBlackJack()) {
  console.log("Dealer wins");
}

function checkResponseValid(res: string) {
  res = res.toLowerCase();
  return res == "hit" || res == "stand";
}

// no one has a BlackJack
// continue the game
let total1 = player1.getTotal();
console.log("Player 1 total: ", total1);

let response = "";
while (!checkResponseValid(response)) {
  response = prompt("Do you like to Hit or Stand?");
  if (response.toLowerCase() == "hit") {
    game.dealCard(player1);

    if (player1.getTotal() > 21) {
      //end
      console.log("Game over. Busted");
      break;
    }
    response = ""; //reset response
  } else if (response.toLowerCase() == "stand") {
    // dealer turn to "hit" or "stand"

    //end; check result
    break;
  }
}
