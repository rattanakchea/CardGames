/**
 * Created by rchea on 10/22/16.
 */

var AI = function(){

    function getRidOfOneCard(){
        var currentPlayer = game.playerHandViews[currentTurn];
        var currentPlayerCardsCount = currentPlayer.cards.length;
        var randomIndex = _.random[0, currentPlayerCardsCount-1];

        //removed one card
        // return an array of one card
        var randomCard = currentPlayer.cards.splice(randomIndex, 1);

        //put into removedCards
        currentPlayer.removedCards.push(randomCard[0]);

        game.properties.lastThrownCardValue = randomCard[0].getValue();
        game.properties.lastThrownByPlayer = currentPlayer.properties.name;

        //not efficient because it renders the whole handView
        currentPlayer.render3();
        updateGameStatus(currentPlayer.options.name + " gets rid of (" + randomCard[0].toString() + ')');

        setTimeout(function(){
            nextPlayer();
        }, 3000);
    }

    function nextPlayer(){
        game.properties.currentTurn = (game.properties.currentTurncurrentTurn + 1) % numOfPlayers;

        if (currentTurn == yourTurn) {
            updateGameStatus(null, ' your turn. Do you have the card of <strong>' + game.properties.lastThrownCardValue + '</strong>?');
            // find in your hand whether you have the card has the same value as game.properties.lastThrownCardValue
        } else {
            // no card had been thrown yet
            if (!game.properties.lastThrownCardValue){
                getRidOfOneCard();
            } else{
                // find a card that matched game.properties.lastThrownCardValue
                findCard();
            }
        }
    }


    return {
        getRidOfOneCard : getRidOfOneCard,
        nextPlayer: nextPlayer,
    }
}