var HandView = function(id){

    'use strict';

    //need to have a series of ids attached to html element ready

    this.option = {
      cardView: null
    };

    this.cards = [];

    //for sikou game
    this.removedCards = [];


    this.renderRemovedCards = function(){
        var html = '';
        this.removedCards.forEach(function(card){
            html += new CardView(card).render();
        });
        $('#removedCards2').html(html);
    };


    this.render2 = function(cards, id){
        var html = '';
        cards.forEach(function(card){
            html += new CardView(card).render();
        });
        $(id).html(html);
    };


    this.el = id;

    this.render = function() {
        var html = '';
        this.cards.forEach(function(card){
            html += new CardView(card).render();
        });
        $(this.el).html(html);
    };

    this.renderOneCard = function(){
        if (this.cards.length > 1){

            var cardView = new CardView(this.cards[0]);
            var html = cardView.render();
            $(this.el).html(html);
        } else {
            console.log('nothing to render');
        }
    };

    //can add a card or an array
    this.add = function(card){
        if (_.isArray(card)) {
            while(card.length > 0){
                this.cards.push(card.pop());
            }
            //concat return a new array
            //this.cards = this.cards.concat(card);
        } else {
            this.cards.push(card);
        }
    };


    this.getScore = function(){
        var score = 0;
        var ace = 0;
        _.each(this.cards, function(card){

            var value = card.value;
            if (value > 9) {
                value = 10;
            } if (value == 1){
                value = 11;
                ace++;
            }
            score += value;
        });

        //check to see if ace should be 1 or 11
        while (score > 21 && ace > 0) {
            score -= 10;
            ace--;
        }
        return score;
    };

};