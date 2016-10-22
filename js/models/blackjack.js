/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// BlackJack Game Constructor

//blackJack Game
var BlackJack = function (){

    this.deck = new Deck();

    this.playerHandView = new HandView('#your-hand');
    this.dealerHandView = new HandView('#dealer-hand');



    ///not used below
    this.events = events;
    this.events.events = {}; //clear previous events when starting a new game

    this.events.on('playerWins', playerWins);

    //for pub-sub events, not used now
    function playerWins (msg){
        $('#stats').find('.win').html(++playerScore);
    }


};

BlackJack.prototype.toString = function(){
    return "BlackJack Game";
}