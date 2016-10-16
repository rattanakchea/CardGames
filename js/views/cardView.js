

var cardTemplate = '<li class="card <%= getSuit() %>"><%= getValue() %> <%= getSymbol() %></li>';

var CardView = function(Card){

    this.template = _.template(cardTemplate);

    this.model = Card;



    this.render = function() {
        //this.model is already an object, don't require JSON.parse();
        return this.template(this.model);

    }
}