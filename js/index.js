/*<------------CONSTANTS----------->*/
const BLACKJACK = 21
const SUITS = ['s', 'c', 'd', 'h']
const RANKS = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const BODY = document.body






/*<------------STATE VARIABLES----------->*/
let isLoading //loading ui during ui renders
let isGameOver // if wager drops to zero
let wager //amount able to bet
let deck
let playerHand
let dealerHand
let winner






/*<------------CACHED ELEMENTS----------->*/
const dealerEl = document.getElementById('dealer')
const playerEl = document.getElementById('player')






/*<------------EVENT LISTENERS----------->*/








/*<------------FUNCTIONS----------->*/
init()

function init() {
    wager = 100
    const cards = []
    SUITS.forEach((suit) => {
        RANKS.forEach((rank) => {
            cards.push(
                {
                face: `${suit}${rank}`,
                //taken from card ui project, Number fn,

                // built-in JS Fn to parse integers
                amount: Number(`${rank}`) || (rank === 'A' ? 11 : 10) //or operator to check if rank holds letter
                //if rank holds A, rank equals 11, otherwise any other letter equates to 10
            })
        })
    })
    console.log('1.Card Array', cards)
    pullRandomCards(cards)
}


function render() {
}

function pullRandomCards(cardArr) {
    //sets loading animation
    isLoading = true
    //Gets random card and stores it in a variable
 
    const card1 = Math.floor(Math.random() * cardArr.length)
    // cardArr.splice(card1, 1)
    const card2 = Math.floor(Math.random() * cardArr.length)
    // cardArr.splice(card2, 1)
    const card3 = Math.floor(Math.random() * cardArr.length)
    // cardArr.splice(card3, 1)
    const card4 = Math.floor(Math.random() * cardArr.length)
    // cardArr.splice(card4, 1)
    console.log(card1, card2, card3, card4)
    // console.log('2. New Card Array', cardArr)

    playerHand = [cardArr[card1], cardArr[card2]]
    dealerHand = [cardArr[card3], cardArr[card4]]

    console.log(playerHand)

    // renderDealerHand(dealerHand)
    renderHands(playerHand, dealerHand)
}

function renderHands(playerArr, dealerArr) {
    playerArr.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.innerHTML = `<div class="card card large ${card.face}"></div><div class="back"></div>`
        // cardEl.className = `card card large card ${card.face}`
        console.log(cardEl)
        playerEl.append(cardEl)
    })
    dealerArr.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.innerHTML = `<div class="card card large ${card.face}"></div><div class="back"></div>`
        console.log(cardEl)
        dealerEl.append(cardEl)
    })
}








/*<------------GENERAL CHECKS----------->*/