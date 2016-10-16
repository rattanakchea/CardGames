/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// BlackJack Game Constructor

//blackJack Game
var BlackJack = function (){

    var self = this;
    this.deck = new Deck();
    this.dealerHand = new Hand();
    this.playerHand = new Hand();

    this.playerHandView = new HandView(this.playerHand, '#your-hand');
    this.dealerHandView = new HandView(this.dealerHand, '#dealer-hand');

    this.wins = 0;
    this.loses = 0;

};

BlackJack.prototype.toString = function(){
    return "BlackJack Game";
}