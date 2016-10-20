/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// BlackJack Game Constructor

//blackJack Game
var Sikou = function (numOfPlayers){

    var numOfPlayers = numOfPlayers || 4;

    this.deck = new Deck();

    //array of players, empty
    this.playerHandViews = [];

    for (var i=0; i < numOfPlayers; i++){
        var hand = new Hand();
        var handView = new HandView(hand, '#player1')
        this.playerHandViews.push(handView);
    }
    init();


    //array of players,
    //player 1 has 6 cards,
    // other players has 5 cards
    function init(){
        _.forEach(this.playerHandView, function(playerHandView){
            playerHandView.addCard(this.deck.deal(5));
        });

        playerHandViews[0].addCard(this.deck.deal())
    }



    // this.playerHand = new Hand();
    // this.playerHandView = new HandView(this.playerHand, '#your-hand');


};

BlackJack.prototype.toString = function(){
    return "Sikou Game";
}