/**
 * Created by rchea on 10/9/16.
 */
"use strict";

// Hand Constructor is similar to Deck
// contain an array of cards
// can sort cards by value
// find pairs
// get rid of pairs
// show cards - toString prototype
// Maybe don't need this moodel ? refactor

var Hand = function (){

    this.cards = [];


    this.removeCard = function(){
        return this.cards.pop();
    }

    this.addCard = function(card){
        this.cards.push(card);
    }

    //display all cards in the hands
    //maybe need to creat a viewHand
    this.render = function(){
        console.log('do nothing noow');
    }

    this.length = this.cards.length;

};

Hand.prototype.toString = function(){
    return this.cards;
};

Hand.prototype.hello = function(){
    return 'hello hand';
};