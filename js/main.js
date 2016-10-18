$( document ).ready(function() {

    var game, playerHand, dealerHand,
        deck, playerHandView, dealerHandView;

    //cach DOM elements
    var $btn_deal = $('#deal'),
        $btn_hit = $('#hit').hide(),
        $btn_stand = $('#stand').hide(),

        $yourScore = $('#yourScore'),
        $dealerScore = $('#dealerScore'),
        $status = $('#status');

    //event listeners
    $btn_deal.on('click', startGame);
    $btn_hit.on('click', dealCard);
    $btn_stand.on('click', stand);


    function toggleBtn(){
        $btn_deal.toggle();
        $btn_hit.toggle();
        $btn_stand.toggle();
    }

    function stand(){
        //in multiplayer, go to next hand, not handled
        //in two player, go to the dealer hand
        dealerHandView.render();

        var dealerScore = dealerHandView.getScore();

        if (dealerScore > 16 && dealerScore > playerHandView.getScore()){
            $status.html('Dealer Won.');
            cleanSlate();
            return;
        }

        while (dealerScore < 17){
            var card = deck.deal();
            dealerHandView.add(card);
            dealerHandView.render();
            dealerScore = dealerHandView.getScore();
            $dealerScore.html(dealerScore);
        }


        standScoreCheck(dealerScore);

        //cleanSlate();
    }

    function cleanSlate(){
        toggleBtn();

        game = new BlackJack(),
        playerHand = game.playerHand,
        dealerHand = game.dealerHand,
        deck = game.deck,
        playerHandView = game.playerHandView,
        dealerHandView = game.dealerHandView;

        $dealerScore.empty();
    }

    //deal a card from the deck into the player hand
    function dealCard(){
        var card = deck.deal();
        playerHandView.add(card);
        renderHands();

        hitScoreCheck(playerHandView.getScore());
    }

    function renderHands(){
        playerHandView.render();
        $yourScore.html(playerHandView.getScore());
    }

    function standScoreCheck(dealerScore){

        console.log('calling stand score check');

        var yourScore = playerHandView.getScore();

       if (dealerScore > 21){
           $status.html('Dealer busted. You won');
           //game.events.emit('playerWins', msg);
            //what is the difference from calling a function, to update score
           game.updateScore('win', 'woowoo, you won');

       } else if (dealerScore > yourScore) {
           $status.html('Dealer Won');
       } else if (dealerScore < yourScore){

           game.events.emit('playerWins', "You won");
       } else {
            $status.html('It is a draw. !!!!');
        }

        toggleBtn();
    }

    //deal two cards for player, and two cards for dealer's hand
    function startGame(){
        console.log('game start..');
        $status.empty();
        cleanSlate();

        //initially deal 2 cards for each Hand
        var card1 = deck.deal();
        var card2 = deck.deal();
        var card3 = deck.deal();
        var card4 = deck.deal();

        playerHandView.add(card1);
        playerHandView.add(card2);
        dealerHandView.add(card3);
        dealerHandView.add(card4);

        dealerHandView.renderOneCard();

        renderHands();
        firstDealCheck(playerHandView.getScore(), dealerHandView.getScore());

        //debugger;
    }

    function firstDealCheck(yourScore, dealerScore){

        if (yourScore == 21 && dealerScore != 21) {
            game.events.emit('playerWins', 'Congratulation, you won. BlackJack !!!!');

            toggleBtn();

        } else if (yourScore == 21 && dealerScore == 21){
            $status.html('Both have BlackJack. Draw!');
            toggleBtn();
        } else if (yourScore != 21 && dealerScore == 21){
            $status.html('Dealer has BlackJack. You lost.');
            dealerHandView.render();
            toggleBtn();
        }
        //keep playing
    }

    // need a seperate check for 2 card deal
    function hitScoreCheck(yourScore, dealerScore){
        if (yourScore > 21) {
            $status.html('Sorry. You are busted. You lost');
            toggleBtn();

        } else if (yourScore == 21) {
            stand();
        }
    }



});