/*<------------CONSTANTS----------->*/
const BLACKJACK = 21
const SUITS = ['s', 'c', 'd', 'h']
const RANKS = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const BODY = document.body






/*<------------STATE VARIABLES----------->*/
let isGameOver // if wager drops to zero
let wager //amount able to bet
let deck
let playerHand
let playerScore
let dealerHand
let dealerScore
let winner






/*<------------CACHED ELEMENTS----------->*/
const dealerEl = document.getElementById('dealer')
const playerEl = document.getElementById('player')
const resetBtn = document.getElementById('reset_btn')
const hitBtn = document.getElementById('hit_btn')
const standBtn = document.getElementById('stand_btn')
const gameStatusEl = document.getElementById('game_status')






/*<------------EVENT LISTENERS----------->*/
resetBtn.addEventListener('click', init)
hitBtn.addEventListener('click', hitPlayer)
standBtn.addEventListener('click', checkHands)





/*<------------FUNCTIONS----------->*/
init()

function init() {
    dealerEl.innerHTML = null
    playerEl.innerHTML = null
    playerScore = 0
    dealerScore = 0
    gameStatusEl.innerText = `SEI Blackjack`
    isGameOver = false
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

    console.log('1.playerHand',playerHand, '2.dealerHand', dealerHand)

    // renderDealerHand(dealerHand)
    renderDealerHand(dealerHand)
    renderPlayerHand(playerHand)
}

function renderDealerHand(dealerArr) {
    dealerArr.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.innerHTML = `<div class="card card large ${card.face}"></div><div class="back"></div>`
        console.log(cardEl)
        dealerEl.append(cardEl)
    })
}

function renderPlayerHand(playerArr) {
    playerArr.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.innerHTML += `<div class="card card large ${card.face}"></div><div class="back"></div>`
        console.log('Amount of divs',cardEl)
        playerEl.append(cardEl)
    })
    console.log(playerArr)
}

function hitPlayer() {
    if (isGameOver) return
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
    playerHand.push(cards[Math.floor(Math.random() * cards.length)])
    renderPlayerHand(playerHand)
}


function checkHands() {
    isGameOver = true
    playerScore = playerHand.reduce((acc, card) => {
        acc += card.amount
        return acc
    }, 0)
    
    console.log(playerScore)
    
    dealerScore = dealerHand.reduce((acc, card) => {
        acc += card.amount
        return acc
    }, 0)
    
    console.log(dealerScore)
    if (playerScore === BLACKJACK) {
        wager =  wager * 1.5
        gameStatusEl.innerText = `You got blackjack!`
    } else if  (playerScore > BLACKJACK) {
        gameStatusEl.innerText = `You busted. Dealer wins!`
        wager *= 0.5
    } else if (dealerScore > BLACKJACK) {
        gameStatusEl.innerText = `The dealer busted! You win!`
    } else if (playerScore > dealerScore) {
        gameStatusEl.innerText = `You win!`
    } else if (playerScore < dealerScore) {
        gameStatusEl.innerText = `Dealer wins!`
    } else if (playerScore === dealerScore) {
        gameStatusEl.innerText = `It's a tie.`
    }

    console.log(wager)
}