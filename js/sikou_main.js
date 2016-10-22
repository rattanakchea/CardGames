$( document ).ready(function() {

    var playerScore = 0,
        dealerScore = 0;

    var game, deck,
        player1HandView,
        player2HandView,
        player3HandView,
        player4HandView;


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
        window.game = game = new Sikou(numOfPlayers);

        console.log(game);
        game.playerHandViews[0].render();
        game.playerHandViews[1].render();
        game.playerHandViews[2].render();
        debugger;
    }

    function startSikouGame(){
        var numOfPlayers = 4;
        initGame(numOfPlayers);


    }

    function dealCard(){

    }

});