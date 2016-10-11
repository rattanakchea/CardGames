/**
 * Created by rchea on 10/9/16.
 */
"use strict";

var suitsMap = ['Clubs', 'Diamonds','Hearts', 'Spades'];
var cardValuesMap = {
    'Ace': 1,
    'Jack': 11,
    'Queen': 12,
    'King': 13
};


// Card Constructor

var Card = function (value, suit){

    if (!value || !suit && suit !== 0){
        console.warn("A card must have both suit and card");
        return;
    }

    if ( 1 <= value && value <= 13){
        this.value = parseInt(value);
    } else if ( cardValuesMap.hasOwnProperty(value) ){
        this.value = cardValuesMap[value];
    } else {
        console.warn("Value must be between 1 to 13, or 'Ace', 'Jack', 'Queen', and 'King'");
        return;
    }

    if ( 1 <= suit && suit <=4 ){
        this.suit = parseInt(suit);
    } else if (suitsMap.indexOf(suit) !== -1){
        this.suit = suitsMap.indexOf(suit) + 1;
    } else {
        console.log('Suit must be between 1-4 or ' + suitsMap.toString());
        return;
    }



    this.getSuit = function(){
        var index = this.suit -1;
        return suitsMap[index];
    };

    this.getValue = function(){
        switch (this.value) {
            case 1: return 'Ace';
            case 11: return 'Jack';
            case 12: return 'Queen';
            case 13: return 'King'
            default: return this.value;
        }
    }


};

Card.prototype.toString = function(){
    return "Card is " + this.getValue() + " of " + this.getSuit();
}