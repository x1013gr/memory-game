/*
 * Create a list that holds all of your cards
 */
const pix = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];


const cardsList = document.querySelector(".deck");
/*array to opened cards*/
let openCards = [];
/*array to put all matched cards in*/
let matchCards = [];

/* Shuffle function from http://stackoverflow.com/a/2450976*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*initialize game*/
function initialize() {
  /*shuffle cards*/
  let allCards = shuffle(pix);
  /*create cards*/
  for(let i = 0; i < pix.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${pix[i]}"></i>`;
    cardsList.appendChild(card);

    /*add click event to each card*/
    click(card);

  }
}


function click(card) {
  /*set click event*/
  card.addEventListener("click", function() {
    const currentCard = this;
    const previousCard = openCards[0];

    pena = true;

    /*opened cards*/
    if(openCards.length === 1) {
      card.classList.add("open", "show", "disable");
      openCards.push(this);

      /*compare opened cards*/
      compare(currentCard, previousCard);
      

    } else {
    /*don't have opened cards*/
      currentCard.classList.add("open", "show", "disable");
      openCards.push(this);
    }
  });
}

/*compare the cards*/
function compare(currentCard, previousCard) {
  if(currentCard.innerHTML === previousCard.innerHTML) {
        /*puts css class to matching cards*/
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        /*puts the matched cards inside*/
        matchCards.push(currentCard, previousCard);

        openCards = [];
        /*game is over*/
        endGame();

      } else {
        /*delay for cards to close*/
        setTimeout(function() {
          currentCard.classList.remove("open", "show", "disable");
          previousCard.classList.remove("open", "show", "disable");

        }, 400);

        openCards = [];
      }

      /*add move*/
      addMove();
}


/*game over*/
function endGame() {
  pena = false;
  if(matchCards.length === pix.length) {
    moves2 = moves + 1;
    if (moves2 < 10) {
      stars2 = 3;
    } else if (10 < moves2 && moves2 < 15) {
      stars2 = 2;
    } else {
      stars2 = 1;
    }
    alert("You did it! Moves:" + moves2 + " Stars:" + stars2 + "/3 Time:" + time + "secs");
  }
}

/*move indicator*/
const movesList = document.querySelector(".moves");
let moves = 0;
movesList.innerHTML = 0;
function addMove() {
  moves++;
  movesList.innerHTML = moves;

  /*rating*/
  rating();
}

/*star rating*/
const starsList = document.querySelector(".stars");
function rating() {
  switch(moves) {
    case 10: starsList.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;
    break;

    case 15: starsList.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;

  }
}



/*refresh button*/
const refreshBtn = document.querySelector(".restart");
refreshBtn.addEventListener("click", function() {
  /*delete all cards*/
  cardsList.innerHTML = "";
  /*restart the game*/
  initialize();
  /*reset vars*/
  matchCards = [];
  /*reset moves*/
  moves = 0;
  /*resets timer*/
  pena = false;
    time = 0;
  timerDis.innerHTML = 0;

  movesList.innerHTML = moves;
  starsList.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;

});

/*set timer*/
const timerDis = document.querySelector("#timer");
let time = 0;
timerDis.innerHTML = 0;
const timer = setInterval(startTime, 1000);
let pena = false;
function startTime() {
  if (pena === true ) {
    time++;
    timerDis.innerHTML = time;
  }
}


/*start the game*/
initialize();
