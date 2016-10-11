$( document ).ready(function() {

    //inside an anonymouse function
    console.log( "let's play!" );


    var game = new BlackJack();
    console.log(game);

    var $yourHand = $('#your-hand'),
        $dealerHand = $('#dearler-hand'),
        $hitBtn = $('#hit'),
        $standBtn = $('#stand'),
        $newGameBtn = $('#deal');





});