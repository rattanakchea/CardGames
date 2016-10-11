/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// BlackJack Game Constructor


//blackJack Game
var BlackGame = function (){

    var self = this;
    this.deck = new Deck();
    this.dealer = new Hand();
    this.player = new Hand();

    this.wins = 0;
    this.loses = 0;






};

BlackGame.prototype.toString = function(){
    return "BlackJack Game";
}