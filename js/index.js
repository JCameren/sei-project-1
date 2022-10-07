/*<------------CONSTANTS----------->*/
const BLACKJACK = 21
const SUITS = ['s', 'c', 'd', 'h']
const RANKS = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']






/*<------------STATE VARIABLES----------->*/
let isLoading //loading ui during ui renders
let isGameOver // if wager drops to zero
let wager //amount able to bet
let deck
let playerHand
let dealerHand
let winner






/*<------------CACHED ELEMENTS----------->*/







/*<------------EVENT LISTENERS----------->*/








/*<------------FUNCTIONS----------->*/
init()

function init() {
    const deck = []
    SUITS.forEach((suit) => {
        RANKS.forEach((rank) => {
            deck.push({
                face: `${suit}${rank}`,
                //taken from card ui project, Number fn,
                // built-in JS Fn to parse integers and
                // show whether it is an int or not(returns boolean)
                amount: Number(`${rank}`) || (rank === 'A' ? 11 : 10) //or operator to check if rank holds letter
                //if rank holds A, rank equals 11, otherwise any other letter equates to 10
            })
        })
    })
    console.log(deck)
}


function render() {}











/*<------------GENERAL CHECKS----------->*/