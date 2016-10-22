$( document ).ready(function() {

    var playerScore = 0,
        dealerScore = 0;

    var game, deck;

    var ctrl = {
        player1HandView: null,
        player2HandView: null,
        player3HandView: null,
        player4HandView: null,
        yourHandView: null, // reference to player hand, control most game play
    }


    //cach DOM elements
    var $btn_deal = $('#deal'),
        $btn_hit = $('#hit'),   //hidden
        $btn_sort = $('#sort'), //hidden by default
        $btn_sikou = $('#sikou'),  //hidden

        $status = $('#status');



    //event listeners
    $btn_deal.on('click', startSikouGame);
    $btn_hit.on('click', dealCard);

    $btn_sort.on('click', sortHand);
    $btn_sikou.on('click', sikou);


    function sortHand(){
        game.sortHand(ctrl.yourHandView);
    }

    //get rid of pairs in a hand
    function sikou(){
        if (game.sikou(ctrl.yourHandView)){
            ctrl.yourHandView.render2(ctrl.yourHandView.cards, '#player2');
            ctrl.yourHandView.render2(ctrl.yourHandView.removedCards, '#removedCards2');
        } else {
            updateGameStatus("No pair in your cards");
        }
    }

    function toggleBtn(){
        $btn_deal.toggle('hidden');
        $btn_hit.toggleClass('hidden');
        $btn_sort.toggleClass('hidden');
        $btn_sikou.toggleClass('hidden');
    }

    function initGame(numOfPlayers){
        toggleBtn();
        window.game = game = new Sikou(numOfPlayers);

        ctrl.player1HandView = game.playerHandViews[0];
        ctrl.yourHandView = ctrl.player2HandView = game.playerHandViews[1];
        ctrl.player3HandView = game.playerHandViews[2];
        ctrl.player4HandView = game.playerHandViews[3];


        game.init();

        if (game.sikou(ctrl.player1HandView)){
            ctrl.player1HandView.render2(ctrl.player1HandView.cards, '#player1');
            ctrl.player1HandView.render2(ctrl.player1HandView.removedCards, '#removedCards1');
        }

        //get rid of pairs in each hand
        //getRidOfPairs([ctrl.player1HandView, ctrl.player3HandView, ctrl.player4HandView])


        //debugger;
    }


    function getRidOfPairs(arrayOfHandView){

        // arrayOfHandView.forEach(function(hv){
        //     if (game.sikou(hv)){
        //         hv.render2(hv.cards, '#player1');
        //         hv.player1HandView.render2(hv.removedCards, '#removedCards1');
        //     }
        // })
    }

    //auto start the game on refresh
    startSikouGame();

    function startSikouGame(){
        var numOfPlayers = 4;
        initGame(numOfPlayers);
    }

    function dealCard(){

    }

    function updateGameStatus (statusMsg){
        $('#status').html(statusMsg);
    }

});