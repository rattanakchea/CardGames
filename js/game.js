/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// BlackJack Game Constructor

var playerScore = 0,
    dealerScore = 0;

//blackJack Game
var BlackJack = function (){

    var self = this;
    this.deck = new Deck();
    this.dealerHand = new Hand();
    this.playerHand = new Hand();

    this.playerHandView = new HandView(this.playerHand, '#your-hand');
    this.dealerHandView = new HandView(this.dealerHand, '#dealer-hand');


    this.events = events;
    this.events.events = {}; //clear previous events when starting a new game


    this.events.on('playerWins', playerWins);

    // result, msg
    this.updateScore = function(result, msg){
        if (result === 'win'){
            playerScore++;
        } else if (result === 'lose'){
            dealerScore++;
        }

        $('#stats').find('.win').html(playerScore);
        $('#stats').find('.lose').html(dealerScore);
        $('#status').html(msg);
    }

    function playerWins (msg){
        alert('win: ', playerScore);
        console.log('playerWin event emits: ', msg);

        $('#stats').find('.win').html(++playerScore);
    }


};

BlackJack.prototype.toString = function(){
    return "BlackJack Game";
}