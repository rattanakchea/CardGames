$( document ).ready(function() {

    var playerScore = 0,
        dealerScore = 0;

    var game, deck, playerHandView, dealerHandView;

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
            updateScore('lose', 'Dealer won.');
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
    }

    function cleanSlate(){
        toggleBtn();

        game = new BlackJack(),
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
        var yourScore = playerHandView.getScore();

       if (dealerScore > 21){
           //game.events.emit('playerWins', msg);
            //what is the difference from calling a function, to update score
           updateScore('win', 'Dealer got bused. You won');

       } else if (dealerScore > yourScore) {
           updateScore('lose', 'Dealer won.');
       } else if (dealerScore < yourScore){
           updateScore('win', 'You won.');
       } else {
           updateScore(null, 'It is a draw.');
       }
    }

    //deal two cards for player, and two cards for dealer's hand
    function startGame(){
        console.log('game start..');
        $status.html("Let's play").removeClass();
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

        var gameOver = true;

        if (yourScore == 21 && dealerScore != 21) {
            updateScore('win', 'BlackJack. You won.');
        } else if (yourScore == 21 && dealerScore == 21){
            updateScore(null, 'Both BlackJack. It is a draw.');
        } else if (yourScore != 21 && dealerScore == 21){
            updateScore('lose', 'Dealer has BlackJack. You lost');
        } else {
            gameOver = false;
        }
        if (gameOver){
            dealerHandView.render();
        }
        //keep playing
    }

    // need a seperate check for 2 card deal
    function hitScoreCheck(yourScore, dealerScore){
        if (yourScore > 21) {
            updateScore('lose', 'You get busted. You lost');
        } else if (yourScore == 21) {
            stand();
        }
    }

    // result, msg
    function updateScore (result, msg){
        if (result === 'win'){
            $('#stats').find('.win').html(++playerScore)
            $('#status').addClass('text-success').html(msg);

        } else if (result === 'lose'){
            $('#stats').find('.lose').html(++dealerScore);
            $('#status').addClass('text-warning').html(msg);
        }

        updateGameStatus(msg);
        toggleBtn();
    }

    function updateGameStatus (statusMsg){
        $('#status').html(statusMsg);
    }



});