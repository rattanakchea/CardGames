$( document ).ready(function() {

    //constant

    var numOfPlayers = 4,
        you = 1;    //position as player 2


    //when startup, player 0 has the ball
    // currentTurn will take turn to pass the ball
    // currentTurn + 1 % numOfPlayers
    var currentTurn = 0;


    var game,
        playerScore = 0,
        dealerScore = 0;

    var ctrl = {
        player1HandView: null,
        player2HandView: null,
        player3HandView: null,
        player4HandView: null,
        yourHandView: null, // reference to player hand, control most game play
    }


    //cache DOM elements
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
            ctrl.yourHandView.render3();
            ctrl.yourHandView.render3();
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

        //get rid of pairs in each hand, except you, the player
        getRidOfPairs([ctrl.player1HandView, ctrl.player3HandView, ctrl.player4HandView])


        // player at playerTurn position now get Rid of a card
        // Easy get rid of a random card
        // Difficult: get rid of the cards already in the removedCards Tray of all players



        getRidOfOneCard();

        //debugger;
    }

    function getRidOfOneCard(){
        var currentPlayer = game.playerHandViews[currentTurn];
        var currentPlayerCardsCount = currentPlayer.cards.length;
        var randomIndex = _.random[0, currentPlayerCardsCount-1];

        //removed one card
        // return an array of one card
        var randomCard = currentPlayer.cards.splice(randomIndex, 1);

        //put into removedCards
        currentPlayer.removedCards.push(randomCard[0]);

        //not efficient because it renders the whole handView
        currentPlayer.render3();
        updateGameStatus(currentPlayer.options.name + " gets rid of (" + randomCard[0].toString() + ')');


        setTimeout(function(){
            nextPlayer();
        }, 3000);
    }


    function nextPlayer(){
        currentTurn = currentTurn + 1 % numOfPlayers;

        if (currentTurn == you) {
            updateGameStatus('It is now your turn.');
        } else {
            getRidOfOneCard();
        }


    }


    function getRidOfPairs(arrayOfHandView){

        arrayOfHandView.forEach(function(hv){
            if (game.sikou(hv)){
                hv.render3();
            }
        })
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