$( document ).ready(function() {

    //constant

    var numOfPlayers = 4;

    var currentTurn = 0, yourTurn = 1, lastThrownByPlayer, lastThrownCardValue;

    
    var yourSelectedCardValue;   //the value of card you select
    var yourSelectedCardIndex;


    var game,
        playerScore = 0,
        dealerScore = 0;

    var ctrl = {
        player1HandView: null,
        player2HandView: null,
        player3HandView: null,
        player4HandView: null,
        yourHandView: null, // reference to player hand, control most game play
    };


    //cache DOM elements
    var $btn_deal = $('#deal'),
        $btn_sort = $('#btn_sort'), //hidden by default
        $btn_sikou = $('#btn_sikou'),  //hidden

        $btn_noMatch = $('#btn_noMatch'),
        $btn_match = $('#btn_match'),
        $btn_throw = $('#btn_throw'),

        $status = $('#status');



    //event listeners
    $btn_deal.on('click', startSikouGame);  //start the game
    $btn_sort.on('click', sortHand);
    $btn_sikou.on('click', sikou);
    $btn_match.on('click', matchCards);
    $btn_throw.on('click', throwACard);   //throw a card after a matched is found

    $btn_noMatch.on('click', nextPlayer);  //go to next player

    $('#player2').on('click', 'li', function(){
        console.log($(this));
        $(this).siblings().removeClass('selected');
        $(this).toggleClass('selected');

        yourSelectedCardValue = $(this).data('value');
        yourSelectedCardIndex = $(this).index();

        console.log('you selected ', yourSelectedCardValue);
    });

    // ++++++++++++++ Init Game ++++++++++++++++++++
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


        getRidOfOneCard();

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
    }
    function getRidOfMatchedCard(yourSelectedCardIndex){
        var currentPlayer = game.playerHandViews[currentTurn];
        var currentPlayerCardsCount = currentPlayer.cards.length;

        if (yourSelectedCardIndex > currentPlayerCardsCount-1) {
            console.log('index of card being removed is wrong');
            return false;
        }
        //removed one card
        // return an array of one card
        var removedCard = currentPlayer.cards.splice(yourSelectedCardIndex, 1);

        //put into removedCards
        currentPlayer.removedCards.push(removedCard[0]);

        //not efficient because it renders the whole handView
        currentPlayer.render3();

        var cardStatus = currentPlayer.options.name + " gets rid of (" + removedCard[0].toString() + ')';
        if (currentPlayer.cards.length == 0) {
            var instruction = "Congratulation, " + currentPlayer.options.name + " is the winner.";
            return true;
            //game over
        } else {
            var instruction = "Please choose the next card to get rid of.";

            $btn_throw.removeClass('hidden');
            $btn_match.removeClass('hidden');
        }

        updateGameStatus(cardStatus, instruction);
        //clean up
        lastThrownCardValue = null;
        yourSelectedCardValue = null;

        return false;
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
        lastThrownByPlayer = currentPlayer.options.name;

        var cardStatus = currentPlayer.options.name + " gets rid of (" + removedCard[0].toString() + ')';
        updateGameStatus(cardStatus, "Now proceeding to next player.");

        $btn_throw.removeClass('hidden');
        $btn_noMatch.removeClass('hidden');

        //go to next player

        setTimeout(function(){
            nextPlayer();
        }, 3000);

    }



    /// ++++++++++++++ AI player logic ends ++++++++++++++
    function sortHand(){
        game.sortHand(ctrl.yourHandView);

        $(this).toggleClass('hidden');
    }

    //get rid of pairs in a hand
    function sikou(){
        if (game.sikou(ctrl.yourHandView)){
            ctrl.yourHandView.render3();
            ctrl.yourHandView.render3();
        } else {
            updateGameStatus(null, "No pair in your cards");
        }

        $(this).toggleClass('hidden');
        $btn_noMatch.toggleClass('hidden');
        $btn_match.toggleClass('hidden');
    }

    function toggleBtn(){
        $btn_deal.toggle('hidden');
        $btn_sort.toggleClass('hidden');
        $btn_sikou.toggleClass('hidden');
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
        lastThrownByPlayer = currentPlayer.options.name;

        //not efficient because it renders the whole handView
        currentPlayer.render3();
        updateGameStatus(currentPlayer.options.name + " gets rid of (" + randomCard[0].toString() + ')');

        setTimeout(nextPlayer(), 3000);
    }

    function nextPlayer(){
        currentTurn = (currentTurn + 1) % numOfPlayers;

        if (currentTurn == yourTurn) {
            updateGameStatus(null, ' your turn. Do you have the card of <strong>' + lastThrownCardValue + '</strong>?');
            // find in your hand whether you have the card has the same value as lastThrownCardValue
        } else {

            setTimeout(findCard(), 3000);

        }
    }

    function findCard(){

        var currentPlayer = game.playerHandViews[currentTurn];

        if (currentPlayer.options.name === lastThrownByPlayer) {
            console.log('run through a full table');

            //make the remaing cards in the deck a circular array
            var lastCard = game.deck.cards.pop();
            //unshift put the lastCard into the front
            game.deck.cards.unshift(lastCard);

            //display the Card to use
            var lastCardHtml = new CardView(lastCard).render();


            $('#topDeck').prepend(lastCardHtml);

            lastThrownCardValue = lastCard.getValue();
            lastThrownByPlayer = currentPlayer.options.name;

            updateGameStatus("Use a card from the deck : " + lastCard);
            nextPlayer();
            return;
        }

        console.log( currentPlayer.options.name + ' is searching for card: ' + lastThrownCardValue);
        //var currentPlayerCardsCount = currentPlayer.cards.length;

        currentPlayer.cards.forEach(function(card, index){
            if (card.getValue() === lastThrownCardValue) {
                console.log('found card at index: ', index);

                if (getRidOfMatchedCard(index)) {
                    //game over
                } else{
                    getRidOfOneCard();
                }

                return;
            }
        });


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