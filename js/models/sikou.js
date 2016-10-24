/**
 * Created by rchea on 10/9/16.
 */
"use strict";

//Sikou Game
var Sikou = function (numOfPlayers){

    var numOfPlayers = numOfPlayers || 4;


    //TODO: need to save as reference and update
    this.properties = {
        lastThrownCardValue: null,
        lastThrownByPlayer: null,
        currentTurn: 0,
        yourTurn: 1   //manual set as the 2nd player
    };

    this.deck = new Deck();

    //array of players, empty
    this.playerHandViews = [];

    this.yourHandView;


    for (var i=0; i < numOfPlayers; i++){

        var options = {
            cardsId:'#player'+i,
            removedCardsId: '#removedCards'+i,
            name: 'Player '+i
        }

        var handView = new HandView(null, options)
        this.playerHandViews.push(handView);
    }

    //array of players,
    //player 1 has 6 cards,
    // other players has 5 cards
    this.init = function(){
        var self = this;
        _.each(self.playerHandViews, function(playerHandView){
            playerHandView.add(self.deck.deal(5));
        });

        this.playerHandViews[0].add(self.deck.deal())

        //start dealing cards into each player's hand
        //this.sortCards();
        this.startDealing();

        //assign to player 2
        this.assignPlayer(1)
    };

    //assign to player
    this.assignPlayer = function(index){
        if (index > this.playerHandViews.length){
            console.log('Overflow index: cannot assign a player bigger than ', this.playerHandViews.length-1);
            return;
        }
        this.yourHandView = this.playerHandViews[index];
    };

    this.startDealing = function(){
        _.each(this.playerHandViews, function(playerHandView){
            playerHandView.render3();
        });
    };

    //hv is short for playerHandView
    this.sortHand = function(hv){
        hv.cards.sort(function(card1, card2){
            return card1.value > card2.value;
        });
        hv.render3();
    };

    //get rid of pairs in a hand
    //cards can be sorted or not
    this.sikou = function(hv){

        var uniqueCards = [];
        var pairs = [];

       // _.filter(hv.cards, function(card){
       //
       //     // undefined if not found, or return the first Card found
       //     var cardFound = _.findWhere(cardsNoPairs, {value: card.value});
       //
       //     //keep the ones not found
       //     return cardFound == undefined;
       // });
        for(var i=0; i < hv.cards.length; i++){
            //var cardFound = _.findWhere(cardsNoPairs, {value: hv.cards[i].value});
            var cardIndex = _.findIndex(uniqueCards, {value: hv.cards[i].value});
            if ( cardIndex == -1){
                uniqueCards.push(hv.cards[i]);
            } else {
                console.log(hv.options.name, ' found a matched: ', uniqueCards[cardIndex]);

                //remove the card found from uniqueCards array
                pairs.push(uniqueCards[cardIndex]);
                pairs.push(hv.cards[i]);
                uniqueCards.splice(cardIndex, 1);
            }
        }

        //no change
        if (uniqueCards.length === hv.cards.length){
            return false;  //no pair
        } else {
            hv.cards = uniqueCards;
            hv.removedCards = pairs;
            return true;
        }

    };

    //sort by card value
    this.sortCards = function(){
        _.each(this.playerHandViews, function(hv){
            hv.cards.sort(function(card1, card2){
                return card1.value > card2.value;
            });
        });
    };






};

Sikou.prototype.toString = function(){
    return "Sikou Game";
}