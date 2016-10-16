

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
        //in multiplayer, go to next hand

        //in two player, go to the dealer hand

        dealerHandView.render();
        var dealerScore = dealerHandView.getScore();
        if (dealerScore > 16 && dealerScore > playerHandView.getScore()){
            $status.html('Dealer Won.');
            cleanSlate();
        }

        while (dealerScore < 17){
            var card = deck.deal();
            dealerHandView.add(card);
            dealerHandView.render();
            dealerScore = dealerHandView.getScore();
            $dealerScore.html(dealerScore);
        }

        checkScore();

        cleanSlate();

    }

    //memory leak
    function slowDeal(hand, handView){

        var timer = setInterval(deal, 2000);
        function deal(){
            var card = deck.deal();
            hand.addCard(card);
            handView.render();

            var score = handView.getScore();
            $dealerScore.html(score);

            if (score > 16){
                clearInterval(timer);
                return score;
            }
        }
    }

    function cleanSlate(){
        toggleBtn();

        game = new BlackJack(),
        playerHand = game.playerHand,
        dealerHand = game.dealerHand,
        deck = game.deck,
        playerHandView = game.playerHandView,
        dealerHandView = game.dealerHandView;
    }

    //deal a card from the deck into the player hand
    function dealCard(){
        var card = deck.deal();
        playerHandView.add(card);
        renderHands();

        checkScore();
    }

    function renderHands(){
        playerHandView.render();
        $yourScore.html(playerHandView.getScore());
        $dealerScore.html(dealerHandView.getScore());
    }

    function checkScore(){
        var yourScore = playerHandView.getScore();
        var dealerScore = dealerHandView.getScore();

        var gameOver = true;
        if (yourScore > 21) {
            $status.html('Sorry. You are busted. You lost');
        } else if (dealerScore > 21){
            $status.html('Dealer busted. You won');
        } else if (yourScore == 21 && dealerScore != 21) {
            $status.html('Congratulation, you won. BlackJack !!!!');
        } else if (yourScore === dealerScore) {
            console.log(yourScore);
            console.log(dealerScore);
            $status.html('It is a draw. !!!!');
        } else if (dealerScore == 21) {
            $status.html('Dealer has BlackJack. You lost');
            //show dealer card

        } else {
            gameOver = false;
        }

        if (gameOver) {
            toggleBtn();
        }
    }


    //deal two cards for player, and two cards for dealer's hand
    function startGame(){
        console.log('game start..');
        $status.empty();

        cleanSlate();

        //initially deal 2 cards
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

        checkScore();

        //debugger;

    }


});