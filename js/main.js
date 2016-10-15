var g = game = new BlackJack();

$( document ).ready(function(game) {

    console.log(game)

    var playerHand = game.playerHand,
        dealerHand = game.dealerHand,
        deck = game.deck;

    //cach DOM elements
    var $btn_deal = $('#deal'),
        $btn_hit = $('#hit'),
        $btn_stand = $('#stand');


    //event listeners
    $btn_deal.on('click', startGame);



    //deal two cards for player, and two cards for dealer's hand
    function startGame(){
        console.log('game start..');

        var aCard = deck.deal()

        playerHand.addCard(aCard);

        console.log(playerHand);

    }


}(g));