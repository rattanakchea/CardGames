import { Deck } from "./Deck";
import { Player } from "./Player";

export class CardGame {
  deck: Deck;
  numOfPlayers: number = 0;
  players: Player[] = [];

  constructor(numOfPlayers: number) {
    if (numOfPlayers < 1) {
      console.log("There must be at least one player");
      return;
    }
    this.numOfPlayers = numOfPlayers;
    this.deck = new Deck();

    for (let i = 0; i < numOfPlayers; i++) {
      const player = new Player();
      this.players.push(player);
    }
  }

  getPlayer(playerIndex: number) {
    return this.players[playerIndex];
  }

  dealCard(toPlayer: Player): void {
    if (!this.deck.isEmpty()) {
      let poppedCard = this.deck.pop();
      toPlayer.addCard(poppedCard);
    } else {
      console.log("The deck is empty, cannot deal Card");
    }
  }
}
