$( document ).ready(function() {

    var playerScore = 0,
        dealerScore = 0;

    var game, deck,
        player1Hand, player1HandView,
        player2Hand, player2HandView,
        player3Hand, player3HandView,
        player4Hand, player4HandView;


    //cach DOM elements
    var $btn_deal = $('#deal'),
        $btn_hit = $('#hit').hide(),

        $status = $('#status');

    //event listeners
    $btn_deal.on('click', startSikouGame);
    $btn_hit.on('click', dealCard);


    function toggleBtn(){
        $btn_deal.toggle();
        $btn_hit.toggle();
    }

    function initGame(numOfPlayers){
        toggleBtn();
        game = new Sikou(numOfPlayers),
            playerHand = game.playerHand,
            dealerHand = game.dealerHand,
            deck = game.deck,
            playerHandView = game.playerHandView,
            dealerHandView = game.dealerHandView;

    }

    function startSikouGame(numOfPlayers){

        initGame(numOfPlayers);


    }

    function dealCard(){

    }







});