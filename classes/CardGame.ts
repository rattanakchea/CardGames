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

  getPlayer(playerIndex) {
    return this.players[playerIndex];
  }
}
