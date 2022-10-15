/*<------------CONSTANTS----------->*/
const BLACKJACK = 21; //var that holds number ref
const SUITS = ["s", "c", "d", "h"]; //array to hold suits for iteration
const RANKS = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
]; //array to hold numbers for iteration

/*<------------STATE VARIABLES----------->*/
let isGameOver; // if wager drops to zero
let bankRoll; //amount able to bet
let bet; //amount actually bet
let playerHand; //will be array holding player card objects
let playerScore; //value sum of amount prop
let dealerHand; // will be arr holding dealer card objects
let dealerScore; //value sum of amount prop

/*<------------CACHED ELEMENTS----------->*/
const dealerEl = document.getElementById("dealer");
const playerEl = document.getElementById("player");
const resetBtn = document.getElementById("reset_btn");
const hitBtn = document.getElementById("hit_btn");
const standBtn = document.getElementById("stand_btn");
const betSubmitBtn = document.getElementById("bet_submit_btn");
const gameStatusEl = document.getElementById("game_status");
const bankEl = document.getElementById("bank_el");
const bankRollEl = document.getElementById("amount_owned");
const betInputEl = document.getElementById("bet_amount_input");
const wageredEl = document.getElementById("amount_wagered");
const alertEl = document.getElementById("alert_el");
const pHandEl = document.getElementById("player_hand");
const dHandEl = document.getElementById("dealer_hand");

/*<------------EVENT LISTENERS----------->*/
resetBtn.addEventListener("click", init);
hitBtn.addEventListener("click", hitPlayer);
standBtn.addEventListener("click", checkHands);
betSubmitBtn.addEventListener("click", cacheBet);

/*<------------GENERAL CHECKS----------->*/
if (bankRoll === 0) {
  isGameOver = true;
}

/*<------------FUNCTIONS----------->*/
init();

function init() {
  //removing class and prop from submitEl
  betSubmitBtn.classList.remove("disabled");
  betSubmitBtn.disabled = false;
  //adds the listener back if it is removed upon initializing
  standBtn.addEventListener("click", checkHands);
  //removes disabled class if appended upon init
  hitBtn.classList.add("disabled");
  hitBtn.disabled = true;
  //removes disabled class if appended upon init
  resetBtn.classList.remove("pulse");
  //removes disabled class if appended upon init
  standBtn.classList.add("disabled");
  standBtn.disabled = true;
  //init monies to 100
  bankRoll = 100;
  bet = 0;
  playerScore = 0; //inits pScore to 0
  dealerScore = 0; //inits dScore to 0
  dealerEl.innerHTML = null; //makes div empty so that re-renders are clean with no elements repeating, very important
  playerEl.innerHTML = null; //makes div empty so that re-renders are clean with no elements repeating, very important
  pHandEl.innerText = `Player Hand: ${playerScore}`;
  dHandEl.innerText = `Dealer Hand: ?`;
  gameStatusEl.innerText = `Hit or Stand`;
  isGameOver = false;
  const cards = [];
  SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
      cards.push({
        face: `${suit}${rank}`,
        //taken from card ui project, Number fn,

        // built-in JS Fn to parse integers
        amount: Number(`${rank}`) || (rank === "A" ? 11 : 10), //or operator to check if rank holds letter
        //if rank holds A, rank equals 11, otherwise any other letter equates to 10
      });
    });
  });

  pullRandomCards(cards);
  renderBet();
  // bankRollEl.innerText = bankRoll
}

function cacheBet() {
  bet = betInputEl.value;
  if (!Number(bet)) {
    alertEl.style.visibility = "visible";
    alertEl.innerText = "Bet must be a number.";
    betInputEl.value = "";
    return;
  } else if (bet > bankRoll) {
    alertEl.style.visibility = "visible";
    alertEl.innerText = "Bet cannot be greater than bankroll.";
    betInputEl.value = "";
    return;
  }
  betSubmitBtn.classList.add("disabled");
  console.log(bet);
  betInputEl.value = "";
  console.log(bet);
  betSubmitBtn.disabled = true;
  standBtn.addEventListener("click", checkHands);
  standBtn.classList.remove("disabled");
  standBtn.disabled = false;
  hitBtn.classList.remove("disabled");
  hitBtn.disabled = false;
  renderBet();
}

function renderBet() {
  if (bet > bankRoll) {
    alertEl.style.visibility = "visible";
    alert.innerText = "Bet cannot exceed current amount held!";
    return;
  }
  alertEl.style.visibility = "hidden";
  wageredEl.innerText = bet;
  bankRollEl.innerText = bankRoll;
}

function pullRandomCards(cardArr) {
  //These are the cards both players will start off with
  const card1 = Math.floor(Math.random() * cardArr.length);
  const card2 = Math.floor(Math.random() * cardArr.length);
  const card3 = Math.floor(Math.random() * cardArr.length);
  const card4 = Math.floor(Math.random() * cardArr.length);

  playerHand = [cardArr[card1], cardArr[card2]]; //first 2 are put into the pHand, pHand becomes an arr
  //use the reduce method to obtain the value sum of each card obj
  playerScore = playerHand.reduce((acc, card) => {
    acc += card.amount;
    return acc;
  }, 0);
  pHandEl.innerText = `Player Hand: ${playerScore}`;

  dealerHand = [cardArr[card3], cardArr[card4]]; //last 2 are placed in pHand, also now an arr

  //The render functions are invoked using both arrs as arguments
  renderDealerHand(dealerHand);
  renderPlayerHand(playerHand);
  if (playerScore >= BLACKJACK) {
    checkHands();
  }
}

function renderDealerHand(dealerArr) {
  //forEach method used on param
  dealerArr.forEach((card) => {
    const cardEl = document.createElement("div"); //creates a div for that card obj
    // cardEl.classList.add(`card card back large ${card.face}`)
    //the card then gets inner html using the face prop from the card obj which will then match with existing css classes ready in the css file
    cardEl.innerHTML = `<div class="card card large ${card.face}"></div>`;
    dealerEl.append(cardEl); //adds this to the container, thus the DOM
    dealerEl.children[0].classList.add("hidden"); //first card will be hidden from player
  });
}

function renderPlayerHand(playerArr) {
  //forEach method used on param
  playerArr.forEach((card) => {
    const cardEl = document.createElement("div"); //creates a div for that card obj
    //the card then gets inner html using the face prop from the card obj which will then match with existing css classes ready in the css file
    cardEl.innerHTML += `<div class="card card large ${card.face}"></div><div class="back"></div>`;
    playerEl.append(cardEl); //adds this to the container, thus the DOM
  });
}

function hitPlayer() {
  if (isGameOver) return; //button will not work if the boolean is true
  playerEl.innerHTML = null; //resets DOM so there are no repating cards, VERY important
  const cards = []; //creates new deck to pick a card obj from
  SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
      cards.push({
        face: `${suit}${rank}`,
        //taken from card ui project, Number fn,

        // built-in JS Fn to parse integers
        amount: Number(`${rank}`) || (rank === "A" ? 11 : 10), //or operator to check if rank holds letter
        //if rank holds A, rank equals 11, otherwise any other letter equates to 10
      });
    });
  });
  playerHand.push(cards[Math.floor(Math.random() * cards.length)]); //pushes new card obj from card arr into playerHand arr
  playerScore = playerHand.reduce((acc, card) => {
    acc += card.amount;
    return acc;
  }, 0); //reduce method to iterate over amount prop to get value sum
  pHandEl.innerText = `Player Hand: ${playerScore}`;
  renderPlayerHand(playerHand);

  if (playerScore >= BLACKJACK) {
    checkHands();
  }
}

function checkHands() {
  standBtn.classList.add("disabled"); //shows player clicks wont work
  hitBtn.classList.add("disabled"); //shows player clicks wont work
  dealerEl.children[0].classList.remove("hidden"); //reveals hidden dealer card to player
  isGameOver = true;
  //reduce method to find value of cards in arr from the amount prop in card obj
  playerScore = playerHand.reduce((acc, card) => {
    acc += card.amount;
    return acc;
  }, 0);

  //reduce method to find value of cards in arr from the amount prop in card obj
  dealerScore = dealerHand.reduce((acc, card) => {
    acc += card.amount;
    return acc;
  }, 0);
  dHandEl.innerText = `Dealer Hand: ${dealerScore}`;

  if (playerScore > BLACKJACK && dealerScore > BLACKJACK) {
    gameStatusEl.innerText = `You both busted.`;
  } else if (playerScore === BLACKJACK && dealerScore === BLACKJACK) {
    gameStatusEl.innerText = `It's a tie.`;
  } else if (playerScore === BLACKJACK) {
    bankRoll += Number(bet) * 2.5;
    gameStatusEl.innerText = `You got blackjack!`;
  } else if (playerScore > BLACKJACK) {
    gameStatusEl.innerText = `You busted. Dealer wins!`;
    bankRoll -= Number(bet);
  } else if (dealerScore > BLACKJACK) {
    gameStatusEl.innerText = `The dealer busted! You win!`;
    bankRoll += Number(bet);
  } else if (playerScore > dealerScore) {
    gameStatusEl.innerText = `You win!`;
    bankRoll += Number(bet);
  } else if (playerScore < dealerScore) {
    gameStatusEl.innerText = `Dealer wins!`;
    bankRoll -= Number(bet);
  } else if (playerScore === dealerScore) {
    gameStatusEl.innerText = `It's a tie.`;
  }

  if (bankRoll <= 0) {
    wager = 0;
    gameStatusEl.innerText = `Game Over.`;
    standBtn.classList.add("disabled");
  }

  standBtn.removeEventListener("click", checkHands);
  setTimeout(() => {
    continueGame();
  }, 2000);
  renderBet();
}

function continueGame() {
  if (bankRoll <= 0) {
    bankRoll = 0;
    bet = 0;
    gameStatusEl.innerText = `Game Over.`;
    resetBtn.classList.add("pulse");
    isGameOver = true;
    renderBet();
    return;
  } //wont work if the player has no money
  betSubmitBtn.classList.remove("disabled");
  betSubmitBtn.disabled = false;
  standBtn.classList.add("disabled");
  standBtn.disabled = true;
  hitBtn.classList.add("disabled");
  hitBtn.disabled = true;
  playerScore = 0;
  dealerScore = 0;
  bet = 0;
  dealerEl.innerHTML = null;
  playerEl.innerHTML = null;
  pHandEl.innerText = `Player Hand: ${playerScore}`;
  dHandEl.innerText = `Dealer Hand: ?`;
  hitBtn.style.visibility = "visible";
  gameStatusEl.innerText = `Hit or Stand`;
  isGameOver = false;
  const cards = [];
  SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
      cards.push({
        face: `${suit}${rank}`,
        //taken from card ui project, Number fn,

        // built-in JS Fn to parse integers
        amount: Number(`${rank}`) || (rank === "A" ? 11 : 10), //or operator to check if rank holds letter
        //if rank holds A, rank equals 11, otherwise any other letter equates to 10
      });
    });
  });

  pullRandomCards(cards);
  renderBet();
}
