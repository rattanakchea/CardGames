var HandView = function(id){

    'use strict';

    //this.collection = Hand;

    this.cards = [];
    this.el = id;
    
    window.sth = this;

    this.render = function() {
        var self = this;
        var html = '';

        this.cards.forEach(function(card){
            html += new CardView(card).render();
        });
        // _.each(this.cards, function(card){
        //     html += new CardView(card).render();
        // });

        $(self.el).html(html);
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