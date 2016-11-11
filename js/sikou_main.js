$( document ).ready(function() {

    //constant

    var numOfPlayers = 4;

    // lastThrowByPlayer saved the last position the card was thrown

    var lastThrownByPlayer, currentTurn = 0, yourTurn = 1, lastThrownCardValue;

    var $lastThrownCardValue = $('#lastThrownCardValue'),
        $lastThrownByPlayer = $('#lastThrownByPlayer'),
        $currentTurn = $('#currentTurn');

    function updateStats(){
        $lastThrownCardValue.html(lastThrownCardValue);
        $lastThrownByPlayer.html(lastThrownByPlayer);
        $currentTurn.html(currentTurn);
    }
    
    var yourSelectedCardValue;   //the value of card you select
    var yourSelectedCardIndex;


    var game = window.game;


    var ctrl = {
        player1HandView: null,
        player2HandView: null,
        player3HandView: null,
        player4HandView: null,
        yourHandView: null, // reference to player hand, control most game play
    };

    //cache DOM elements
    var $btn_newGame = $('#btn_newGame'),
        $btn_sort = $('#btn_sort'), //hidden by default
        $btn_sikou = $('#btn_sikou'),  //hidden

        $btn_noMatch = $('#btn_noMatch'),
        $btn_match = $('#btn_match'),
        $btn_throw = $('#btn_throw'),

        $status = $('#status');

    //event listeners
    $btn_newGame.on('click', startSikouGame);  //start the game
    $btn_sort.on('click', sortHand);
    $btn_sikou.on('click', sikou);
    $btn_match.on('click', matchCards);
    $btn_throw.on('click', throwACard);   //throw a card after a matched is found

    $btn_noMatch.on('click', nextPlayer);  //go to next player

    $('#player1').on('click', 'li', function(){
        $(this).siblings().removeClass('selected');
        $(this).toggleClass('selected');
        yourSelectedCardValue = $(this).data('value');
        yourSelectedCardIndex = $(this).index();
        console.log('you selected ', yourSelectedCardValue);
    });

    // ++++++++++++++ Init Game ++++++++++++++++++++
    function initGame(numOfPlayers){
        window.game = game = new Sikou(numOfPlayers);

        toggleBtns();

        ctrl.player1HandView = game.playerHandViews[0];
        ctrl.yourHandView = ctrl.player2HandView = game.playerHandViews[1];
        ctrl.player3HandView = game.playerHandViews[2];
        ctrl.player4HandView = game.playerHandViews[3];


        game.init();

        //get rid of pairs in each hand, except you, the player
        getRidOfPairs([ctrl.player1HandView, ctrl.player3HandView, ctrl.player4HandView])
        getRidOfOneCard();


        updateStats();
        //debugger;
    }

    // ++++++++++++++ Player Logic +++++++++++++++++++++
    function matchCards(){
        if (!yourSelectedCardValue){
            updateGameStatus(null, "You must choose a card to match.");
            return;
        }
        if (yourSelectedCardValue === lastThrownCardValue) {
            console.log('You had a matched card: ', yourSelectedCardValue);

            getRidOfMatchedCard(yourSelectedCardIndex);

        } else {
            updateGameStatus(null, "The cards are not matched");
            console.warn('yourSelectedCardValue: ', yourSelectedCardValue);
            console.warn('lastThrownCardValue: ', lastThrownCardValue);
        }

        updateStats();
    }
    function getRidOfMatchedCard(yourSelectedCardIndex){
        var currentPlayer = game.playerHandViews[currentTurn];
        var currentPlayerCardsCount = currentPlayer.cards.length;

        //removed one card
        // return an array of one card
        var removedCard = currentPlayer.cards.splice(yourSelectedCardIndex, 1);

        //put into removedCards
        currentPlayer.removedCards.push(removedCard[0]);

        //not efficient because it renders the whole handView
        currentPlayer.render3();

        var gameOver = false;
        var cardStatus = currentPlayer.options.name + " gets rid of (" + removedCard[0].toString() + ')';
        if (currentPlayer.cards.length == 0) {
            var instruction = "Congratulation, " + currentPlayer.options.name + " is the winner.";
            gameOver = true;
        } else {
            var instruction = "Please choose the next card to get rid of.";

            //switch only for you
            if (currentTurn == yourTurn){
                $btn_throw.show();
                $btn_noMatch.hide();
                $btn_match.hide();
            }

        }

        updateGameStatus(cardStatus, instruction);
        //clean up
        lastThrownCardValue = null;
        yourSelectedCardValue = null;

        updateStats();
        return gameOver;
    }

    // pre: user select a card from the the remaining cards[]
    // we have `yourSelectedCardValue` && `yourSelectedCardIndex` to use
    function throwACard(){
        if (!yourSelectedCardValue){
            updateGameStatus(null, "You must choose a card to throw.");
            return;
        }

        var currentPlayer = game.playerHandViews[currentTurn];
        var currentPlayerCardsCount = currentPlayer.cards.length;

        if (yourSelectedCardIndex > currentPlayerCardsCount-1) {
            console.log('index of card being removed is wrong');
            return;
        }
        //removed one card
        // return an array of one card
        var removedCard = currentPlayer.cards.splice(yourSelectedCardIndex, 1);

        //put into removedCards
        currentPlayer.removedCards.push(removedCard[0]);
        currentPlayer.render3();

        lastThrownCardValue = yourSelectedCardValue;
        lastThrownByPlayer = currentTurn;

        var cardStatus = currentPlayer.options.name + " throws " + removedCard[0];

        updateGameStatus(cardStatus, "Now proceeding to next player.");
        console.log(cardStatus);
        console.log("update last thrown player to: ", lastThrownByPlayer);

        if (currentTurn == yourTurn){
            $btn_throw.hide();
            $btn_noMatch.show();
            $btn_match.show();
        }

        updateStats();
        //go to next player
        setTimeout(nextPlayer, 3000);

    }



    /// ++++++++++++++ AI player logic ends ++++++++++++++
    function sortHand(){
        game.sortHand(ctrl.yourHandView);

        $(this).remove();
    }

    //get rid of pairs in a hand
    function sikou(){
        if (game.sikou(ctrl.yourHandView)){
            ctrl.yourHandView.render3();
        } else {
            updateGameStatus(null, "No pair in your cards");
        }
        $(this).hide();  //hide itself
        $btn_noMatch.show();
        $btn_match.show();
    }

    function toggleBtns(){
        $btn_newGame.hide();
        $btn_sort.show();
        $btn_sikou.show();

        $btn_noMatch.hide();
        $btn_match.hide();
        $btn_throw.hide();

    }

    // Easy get rid of a random card
    // Difficult: get rid of the cards already in the removedCards Tray of all players
    function getRidOfOneCard(){
        var currentPlayer = game.playerHandViews[currentTurn];
        var currentPlayerCardsCount = currentPlayer.cards.length;
        var randomIndex = _.random[0, currentPlayerCardsCount-1];

        //removed one card
        // return an array of one card
        var randomCard = currentPlayer.cards.splice(randomIndex, 1);

        //put into removedCards
        currentPlayer.removedCards.push(randomCard[0]);

        lastThrownCardValue = randomCard[0].getValue();
        lastThrownByPlayer = currentTurn;

        //not efficient because it renders the whole handView
        currentPlayer.render3();
        updateGameStatus(currentPlayer.options.name + " throws " + randomCard[0]);

        console.log(currentPlayer.options.name + " throws " + randomCard[0]);
        console.log("update last thrown player to: ", lastThrownByPlayer);

        setTimeout(nextPlayer, 3000);

        updateStats();
    }



    function nextPlayer(){

        currentTurn = (currentTurn + 1) % numOfPlayers;
        updateStats();

        var currentPlayer = game.playerHandViews[currentTurn];


        if (currentTurn === lastThrownByPlayer){
            console.log('run through a full table');
            throwCardFromDeck();
        }

        else if (currentTurn == yourTurn) {
            console.log( currentPlayer.options.name + ' is searching for card: ' + lastThrownCardValue);
            updateGameStatus(null, ' your turn. Do you have the card of <strong>' + lastThrownCardValue + '</strong>?');

            $btn_noMatch.show();
            $btn_match.show();

            // UI interruption by user input
            return;

        } else{

            findCard();
        }
    }

    //remove a card from a deck
    function throwCardFromDeck(){
        //make the remaining cards in the deck a circular array
        var lastCard = game.deck.cards.pop();
        //unshift put the lastCard into the front
        game.deck.cards.unshift(lastCard);

        //display the Card to use
        var lastCardHtml = new CardView(lastCard).render();
        $('#topDeck').prepend(lastCardHtml);

        lastThrownCardValue = lastCard.getValue();
        //important logic here, just move the last position one
        // wrong-produce circular loop: lastThrownByPlayer = (currentTurn + 1) % numOfPlayers;

        lastThrownByPlayer = (lastThrownByPlayer + 1) % numOfPlayers;
        currentTurn = lastThrownByPlayer;

        updateStats();

        console.log('Throw a card from the deck: ', lastThrownCardValue);
        console.log('Update last thrown card player ', lastThrownByPlayer);

        updateGameStatus("Use a card from the deck : " + lastCard);

        var currentPlayer = game.playerHandViews[currentTurn];
        if (currentTurn == yourTurn) {
            console.log( currentPlayer.options.name + ' is searching for card: ' + lastThrownCardValue);
            updateGameStatus(null, ' your turn. Do you have the card of <strong>' + lastThrownCardValue + '</strong>?');
            $btn_noMatch.show();
            $btn_match.show();
            // UI interruption by user input
            return;
        } else{
            findCard();
        }
    }

    function findCard(){

        var currentPlayer = game.playerHandViews[currentTurn];
        console.log( currentPlayer.options.name + ' is searching for card: ' + lastThrownCardValue);
        //var currentPlayerCardsCount = currentPlayer.cards.length;


        for(var i=0; i< currentPlayer.cards.length; i++){
            var card = currentPlayer.cards[i];
            if (card.getValue() == lastThrownCardValue) {
                console.log(currentPlayer.options.name + ' found ' + lastThrownCardValue + ' at index: ', i);
                if (getRidOfMatchedCard(i)) {
                    //game over
                } else{
                    getRidOfOneCard();
                }
                return;  //exit function
            }
        }

        console.log( currentPlayer.options.name + ' finished searching and does not have card: ' + lastThrownCardValue);

        //not found
        nextPlayer();

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

    function updateGameStatus (cardStatus, statusMsg){
        if (cardStatus){
            $('#status_card').html(cardStatus);
        }

        if (statusMsg){
            $('#status_instruction').html(statusMsg);
        }
    }

});