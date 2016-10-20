/**
 * Created by rchea on 10/9/16.
 */


// Deck Constructor
// contains 52 unique cards
    // can shuffle, and deal a card

"use strict";

var Deck = function (){

    //array of 52 cards when initialized
    //var cards_array = [];

    this.cards = [];

    this.size = function(){
        return this.cards.length;
    };

    this.deal = function(numberOfCards){
        if (this.size() === 0){
            console.log('Ran out of card, create a new Deck');
            return;
        }

        if (numberOfCards > this.size()){
            console.warn('Not enough cards to disperse');
            return;
        }

        return _.first(this.cards, numberOfCards);


    };


    this.getCards = function(){
        return this.cards;
    }


    this.shuffle = function(){
        this.cards = _.shuffle(this.cards);
    };

    var self = this;


    function init(){
        for (var i=0; i <= 51; i++){
            var value = i % 13 + 1;
            var suit = i % 4 + 1;
            //card cannot be uppercase
            var card = new Card(value, suit);
            self.cards.push(card);
        }

        self.shuffle();
    }
    init();



};

Deck.prototype.toString = function(){
    return "Deck of cards";
};