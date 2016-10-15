/**
 * Created by rchea on 10/9/16.
 */


// Deck Constructor
// contains 52 unique cards
    // can shuffle, and deal a card

"use strict";

var Deck = function (){

    //array of 52 cards when initialized
    var cards_array = [];

    this.cards = cards_array;

    this.size = function(){
        return cards_array.length;
    };

    this.deal = function(){
        if (this.size() === 0){
            console.log('Ran out of card, create a new Deck');
            init();
        }

        return cards_array.pop();
    };

    this.shuffle = function(){
        cards_array = _.shuffle(cards_array);
    };

    this.getCards = function(){
        return cards_array;
    }


    function init(){
        for (var i=0; i <= 51; i++){
            var value = i % 13 + 1;
            var suit = i % 4 + 1;

            //card cannot be uppercase
            var card = new Card(value, suit);

            cards_array.push(card);
        }
    }
    init();



};

Deck.prototype.toString = function(){
    return "Deck of cards";
};