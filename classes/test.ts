import { Card, SuitEnum } from "./Card";
import { Deck } from "./Deck";

let card1 = new Card(SuitEnum.Spade, 1);
let card2 = new Card(SuitEnum.Heart, 1);

console.log(card1, card2);
console.log(card2.equal(card2));

const d = new Deck();
console.log(d);
