/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// BlackJack Game Constructor




//blackJack Game
var BlackJack = function (){

    var self = this;
    this.deck = new Deck();
    this.dealer = new Hand();
    this.player = new Hand();

    this.wins = 0;
    this.loses = 0;


    //Todo Work on the UI



    //Work on the logic of the game




};

BlackJack.prototype.toString = function(){
    return "BlackJack Game";
}